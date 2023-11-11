//  --------------------------------------------------------------------------------       SETUP         -----------------------------------------------------------------------------------

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")

const passport = require("passport");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const authenticate = require('../middleware/authenticate')
//DB
require('../db/dbconn')

//Schema
const productSchema = require('../schema/productSchema');
const userSchema = require("../schema/userSchema");
const orderSchema = require("../schema/orderSchema");
const reviewSchema = require('../schema/reviewSchema');


// ---------------------------------------------------------------------------------   GOOGLE OAUTH 2     --------------------------------------------------------------------------------------

//signup - strategy
router.get("/auth/google/signup", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/auth/google/signup/callback",
	passport.authenticate("google",{session: false}),
	(req,res) => {
		// successRedirect: process.env.CLIENT_URL,
		// failureRedirect: "/signup/failed",
		const token = req.user.token
		res.cookie("jwtoken", token, { path: '/' },{ expires:new Date(Date.now()+ 25892000),httpOnly: true });
		console.log("Cookie stored");
		console.log("========================");
    	res.redirect(process.env.CLIENT_URL);

	}
);


// -------------------------------------------------------------------------------------    ROUTES     ----------------------------------------------------------------------------------------



//For registering users
router.post('/user-register', async (req, res) => {
	const { displayName, email, password } = req.body;
	// Validate email format using a regular expression
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if (!email || !emailRegex.test(email)) {
	  console.log("Invalid email format");
	  return res.status(422).json({ error: "Invalid email format" });
	}
	// Validate password length
	if (!password || password.length < 6) {
	  console.log("Password should be at least 6 characters long");
	  return res.status(422).json({ error: "Password should be at least 6 characters long" });
	}
	// Ensure displayName is not empty
	if (!displayName) {
	  console.log("Display name is required");
	  return res.status(422).json({ error: "Display name is required" });
	}
	try {
	  const userExist = await userSchema.findOne({ email: email });
	  if (userExist) {
		console.log("Email already exists");
		return res.status(422).json({ error: "Email already exists" });
	  }  
	  const user = new userSchema({ displayName, email, password });
	  const token = await user.generateAuthToken();
	  res.cookie("jwtoken", token, { path: '/', expires: new Date(Date.now() + 25892000), httpOnly: true });
	  console.log("Cookie stored");
	  console.log("========================");
	  const userRegister = await user.save();
	  if (userRegister) {
		console.log(user);
		console.log("User registered successfully");
		res.status(201).json({ message: "User registered successfully" });
	  } else {
		console.log("Failed to register");
		res.status(500).json({ error: "Failed to register" });
	  }
	} catch (err) {
	  console.log(err);
	}
  });
  

// Login for Users
router.post('/user-login', async (req,res)=>{
    try
    {
        const { email, password }=req.body;
        if(!email || !password){
         console.log("Please fill the data");
         return res.status(400).json({errror:"Please fill the data"})
        }
        const userLogin = await userSchema.findOne({email:email}); 
        if(userLogin)
        {
           const isMatch = await bcrypt.compare(password, userLogin.password);
           if(!isMatch)
           {
            console.log("Invalid Credentials");
            return res.status(400).json({error:"Invalid Credentials"});
           }
           else
           {
			const token = await userLogin.generateAuthToken();
			res.cookie("jwtoken", token, { path: '/' },{ expires:new Date(Date.now()+ 25892000),httpOnly: true });
			console.log("Cookie stored");
			console.log("========================");
            console.log("User SignIn Successful");
            res.json({message:"User SignIn Successful"});
           }
        }
        else
        {
         console.log("Email you have entered has not registered or incorrect");
         return res.status(400).json({error:"Email you have entered has not registered or incorrect"});
        }
     }  
     catch(err)
     {
        console.log(err);
     }
})


//This will return the user's detail to the user's page in client side
router.get("/getData",authenticate, (req,res) => 
{
    res.send(req.rootUser);
});  

//to get all data with images
router.get('/product/images', (req, res) => {
	productSchema.find()
	  .sort('-created')
	  .then((images) => {
		res.json(images);
	  }).catch((err) => {
		res.status(500).json({ success: false, error: err.message });
	  });
  });
	
// handle GET request for all Products
router.get('/products', async (req, res) => {
  try {
	const users = await productSchema.find();
	res.send(users);
  } catch (err) {
	res.status(500).send(err);
  }
});
  
// Get an product by ID (dynamic pages)
router.get('/api/dynamicproduct/:id', async (req, res) => {
 try {
 	const prodcut = await productSchema.findById(req.params.id);
	res.json(prodcut);
 } catch (err) {
	res.status(500).json({ error: 'Failed to fetch employee details' });
 }
}); 
  
// Clearance of cookies when Logout 
router.get("/logout1", (req,res) => 
{
	
	res.clearCookie('jwtoken', {path: '/'});
	res.status(200).send("User Logout");
});



// --------------------------------------------------------------------    CART FUNCTIONALITY      -----------------------------------------------------------------------------------------
 

//ADD TO CART
router.post('/addtocart',authenticate, async (req, res) => {
	try {
	  const { name,model_id,type,category,avatar,price,discount,quantity} = req.body;
	  const user=await userSchema.findOne({_id:req.userID});
	  // Check if the product is already in the user's cart
	  const productInCart = user.cart.find((item) => item.name === name);
	  if (productInCart) {
		console.log(`Product "${name}" already exists in cart`);
		return res.status(422).json({ error: 'Product already added to the cart' });
	  }
	  // Add the new item to the user's cart
	  user.cart.push({ name,model_id,type,category,avatar,price,discount,total_quantity:quantity});
	  // Save the user document with the updated cart
	  await user.save();
	  res.json({ message: 'Item added to the cart' });
	  console.log(`the product "${name}" is added successfully to the cart of "${user.displayName}"`);
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: 'Server error' });
	}
});
    
// handle GET request for all Products in the cart
router.get('/cartitems', authenticate, async (req, res) => {
	const user=await userSchema.findOne({_id:req.userID});
	const items = user.cart;
	res.send(items);
});
  
// Delete items in cart
router.delete('/cartitems/:id', authenticate, async (req, res) => {
	const userId = req.userID;
	const itemIdToDelete = req.params.id;
	try {
	  // Find the user by their ID
	  const user = await userSchema.findById(userId);
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
	  // Use Mongoose's pull method to remove the item from the cart array
	  user.cart.pull(itemIdToDelete);
	  // Save the updated user
	  await user.save();
	  res.json({ message: 'Item removed from the cart successfully' });
	  console.log(`the product is deleted successfully from the cart of "${user.displayName}"`);
	}catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error' });
	}
});

// ----------------------------------------------------------------------  order history ------------------------------------------------------------------------------------------


  // handle GET request for all Products in the cart
  router.get('/orderitems', authenticate, async (req, res) => {
	try {
	  const user = await userSchema.findOne({ _id: req.userID });
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  const orderHistory = user.order_history; // Assuming it's 'order_history' in your schema
	  res.json({ orderHistory }); // Sending 'orderHistory' in an object
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error' });
	}
  });  

// ----------------------------------------------------------------------  CHECKOUT ------------------------------------------------------------------------------------------


  	// Create a route to update the cart
	router.post('/updateCart', authenticate, async (req, res) => {
	try {
	  // Extract the cart data from the request body
	  const { cart , total} = req.body;
  
	  // Find the user by their ID using the authenticated user data
	  const user = req.rootUser;
  
	  // Update the curr_quantity for each item in the user's cart
	  cart.forEach((cartItem) => {
		const userCartItem = user.cart.find(
		  (item) => item.model_id === cartItem.model_id
		);
  
		if (userCartItem) {
		  userCartItem.curr_quantity = cartItem.cartquantity;
		}
	  });
	  user.total_amount = total;
	  // Save the user with the updated cart
	  await user.save();
	  console.log("cart updated");
	  res.status(200).json({ message: 'Cart updated successfully' });
	} catch (error) {
	  console.error('Error updating cart:', error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  	});
  

  	// Create a route to decrement cart quantity and clear cart
	router.post('/decrementproduct', authenticate, async (req, res) => {
	try { 
	  // Find the user by authenticated user data
	  const user = req.rootUser;
	  // Loop through each cart item and update product quantity
	  for (const cartItem of user.cart) {
		const product = await productSchema.findOne({ model_id: cartItem.model_id });
		if (!product) {
		  return res.status(404).json({ error: `Product not found for model_id: ${cartItem.model_id}` });
		}
		if (product.quantity >= cartItem.curr_quantity) {
		  product.quantity -= cartItem.curr_quantity;
		} else {
		  return res.status(400).json({ error: `Insufficient product quantity for model_id: ${cartItem.model_id}` });
		}  
		// Save the updated product data
		await product.save();
		// clear the cart
		user.cart = [];
		await user.save();
		console.log("cart cleared");
	  }
	  console.log("product quantities decremented");
	  res.status(200).json({ message: 'Quantities decremented successfully' });

	  //changing the status to paid
	  // .................................................................

	 } catch (error) {
	  console.error('Error decrementing quantities:', error);
	  res.status(500).json({ error: 'Internal server error' });
	 } 
    }); 

	//checkout - shipping
	router.post('/checkout', authenticate, async (req, res) => {
		try {
		  const user = await userSchema.findOne({ _id: req.userID });
		  const { total_amount, phone, address, pincode, state, country , status} = req.body;
		  if ( !total_amount || !phone || !address || !pincode || !state || !country  ) {
			console.log("please fill the field properly");
			return res.status(404).json({ error: "Fill the fields properly" });
		  }
		  const orderItems = [];
		  // Iterate through the items in the user's cart
		  for (const cartItem of user.cart) {
			// Map cart item data to order item fields
			const orderItem = {
			  product_name: cartItem.name,
			  model_id: cartItem.model_id,
			  price: cartItem.price,
			  quantity: cartItem.curr_quantity,
			};
			// Push the order item to the orderItems array
			orderItems.push(orderItem);
		  }
		  const order = new orderSchema({
			user_name: user.displayName,
			email: user.email,
			phone,
			address,
			pincode,
			state,
			country,
			total_amount,
			order_items: orderItems,
			status: status,
		  });
		  await order.save();
		  
		  // Add the order to the user's order history
		  user.order_history.push({
			order_date: new Date(),
			order_items: orderItems,
			total_amount: total_amount,
			status: status,
		  });
		  await user.save();
		  res.status(200).json({ message: 'Order request received' });
		  console.log(`Order request received from ${user.displayName} \n Razorpay pop-up initiated`);
		} catch (error) {
		  console.error(error);
		  res.status(500).json({ error: 'Internal server error' });
		  console.log("Error placing order");
		}
	  });


// ========================================================================== user review - footer page ===================================================================

	  router.post('/submit-review', authenticate , async (req, res) => {
		try {
			const {message} = req.body;
			const user = await userSchema.findOne({ _id: req.userID });
			if (!user) {
			  return res.status(404).json({ message: 'User not found' });
			}
	  
		  // Create a new review
		  const review = new reviewSchema({
			user: user.displayName,
			email: user.email,
			message: message,
		  });
	  
		  // Save the review to the database
		  await review.save();
		  console.log("message saved");
		  res.status(201).json({ message: 'Review submitted successfully' });
		} catch (error) {
		  console.error(error);
		  res.status(500).json({ error: 'Internal Server Error' });
		}
	  });
  


module.exports = router; 
import React from 'react'
import './about.css'
import Navbar from '../1.Navbar/Navbar';
import Footer from '../11.Footer2/Footer2';

const About = () => {
  return (
    <>
   <Navbar />
    <div className='body'>
        

       <div className='story'>   
            <div className='about'>About Us</div>

            <div className='content'>At Cover It Up, we specialize in personalizing pop culture-inspired merchandise, ranging from phone covers for iphone models to andriod models and other accessories too. What started as a humble Instagram page has now grown into a thriving ecommerce platform, thanks to the vision and passion of our founder, Surya Rakshan.</div>
       
       </div> 


       <div className='one'>
            <div className='left'>
                <div className='title'>Privacy Policy</div>
                <div className='order-content'>
                Welcome to Fuzze Fashions. This Privacy Policy outlines how we collect, use, and secure your personal information when you use our website.
                </div>
            </div>
            <div className='right'>

            
                <div className='title'>Information Collection</div>
                <div className='order-content'>
                We collect personal information such as names, email addresses, addresses, and payment details during ordering and account creation. This information is used to fulfill orders and communicate with you.
                </div>
          

            </div>
       </div>

       <div className='one'>
            <div className='left'>
                <div className='title'>Data Security</div>
                <div className='order-content'>
                We are committed to ensuring that your information is secure. We employ reasonable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
                </div>
            </div>
            <div className='right'>

           
                <div className='title'>Cookies</div>
                <div className='order-content'>
                Our website may use "cookies" to enhance your experience. You have the option to accept or decline these cookies, but certain features of the site may not function correctly without them.
                </div>
           

            </div>
       </div>

       <div className='terms'>

            <div className='about'>Terms and Conditions</div>

                    <div className='content'>Free Shipping Nationwide. Support Email us 24/7, we'll get back to you as soon as possible. Secure Payment All payments are processed securely.</div>

        </div>

       <div className='one'>
            <div className='left'>
                <div className='title'>Third-Party Disclosure</div>
                <div className='order-content'>
                We do not sell, trade, or otherwise transfer your personally identifiable information to third parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
                </div>
            </div>
            <div className='right'>

           
                <div className='title'>Changes to This Policy</div>
                <div className='order-content'>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                If you have questions about this policy, contact us by using the feedback form in the footer.
                </div>
            
            </div>
       </div>

       <div className='one'>
            <div className='left'>
                <div className='title'>Suggestions</div>
                <div className='order-content'>
                <li>To optimize your experience, we prioritize easy navigation with clear product categories and a swift-loading website.</li>
                <li>Our policies are transparent regarding shipping, returns, and privacy. Checkout is streamlined for simplicity and security. </li>
                <li>Reach us easily through responsive customer support. Tailored product recommendations and regular updates keep you informed and engaged. </li>
                <li>Our mobile-friendly site ensures accessibility on all devices. </li>
                <li>Engaging content, community reviews, and empowering information aid in your decision-making. </li>
                <li>Clear call-to-actions guide you seamlessly. Loyalty programs and privacy respect are paramount, and your feedback helps us enhance our service. </li>
                <li>We value your satisfaction and aim for an exceptional shopping journey.</li>
                </div>
            </div>
            <div className='right'>

           
                <div className='title'>Changes to This Policy</div>
                <div className='order-content'> 
                    <li>Our dedicated customer support team is available to assist you in weekdays. </li>
                    <li>Our support hours are from 9:00 AM to 6:00 PM (local time) Monday through Friday.</li>
                    <li>We strive to promptly respond to your inquiries and provide the assistance you need during these hours, ensuring a smooth and enjoyable shopping experience.   </li> 
                </div>
            
            </div>
       </div>

       <div className='faq'>   
            <div className='faq-title'>Frequently Asked Questions (FAQs)</div>

            <div className='faq-content'>
                <div className='faq-question'>
                1. How can I place an order for mobile covers?
                </div>
                <div className='faq-answer'>
                To place an order, simply browse our collection, select the mobile covers you like, add them to your cart, and proceed to checkout. Follow the steps to complete your order.
                </div>
                <div className='faq-question'>
                2. What payment methods do you accept?
                </div>
                <div className='faq-answer'>
                We accept major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment options. Choose your preferred method during checkout.
                </div>
                <div className='faq-question'>
                3. How long does it take to process and ship my order?
                </div>
                <div className='faq-answer'>
                Orders are typically processed within 1-2 business days. Shipping times vary based on your location. You'll receive a confirmation email with tracking information once your order is shipped.
                </div>
                <div className='faq-question'>
                4. What is your return and exchange policy?
                </div>
                <div className='faq-answer'>
                We offer a hassle-free 10-day return and exchange policy. If you're not satisfied with your purchase, contact us within 10 days of receiving your order to initiate the return or exchange process.
                </div>
                <div className='faq-question'>
                5. What if I receive a damaged or incorrect item?
                </div>
                <div className='faq-answer'>
                In the rare event that you receive a damaged or incorrect item, please contact our customer support immediately. We'll work to resolve the issue and ensure your satisfaction.
                </div>
                <div className='faq-question'>
                6. How can I contact your customer support?
                </div>
                <div className='faq-answer'>
                For any inquiries or assistance, you can reach our customer support team via email or by phone.
                </div>
                <div className='faq-question'>
                7. Can I cancel my order after it's been placed?
                </div>
                <div className='faq-answer'>
                If your order has not been shipped yet, you may be able to cancel it. Contact our customer support as soon as possible with your order details for assistance.
                </div>
                <div className='faq-question'>
                8. Do you offer bulk or wholesale discounts?
                </div>
                <div className='faq-answer'>
                Yes, we offer discounts for bulk or wholesale purchases. Please contact us for more information and pricing.
                </div>
            </div>
       
       </div> 



       
    </div>
    <Footer />
    </>
  )
}

export default About
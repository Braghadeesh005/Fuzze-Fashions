import React , {useEffect}from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const PostData = async () => {
  try {
    await fetch("http://localhost:4000/decrementproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "paid"
      }),
      credentials: 'include',
    });
    navigate("/user")
    } catch (error) {
    console.error('Error decrementing quantities:', error);
    swal("Error", "Failed to decrement quantities", "error");
    return;
    }
  }

  useEffect(() => {
    // Call PostData when the component is mounted (i.e., when the page is opened)
    PostData();
  }, []);

  return (
    <>
    <p>Thamks for purchasing.</p>
    </>
  )
}

export default PaymentSuccess
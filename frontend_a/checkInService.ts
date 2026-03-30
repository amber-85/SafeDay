const BASE_URL="http://localhost:5000/api";

export const checkIn=async(user_id:string)=>{
    const res=await fetch(`${BASE_URL}/checkins`,{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_id}),
    });

    return res.json();
};
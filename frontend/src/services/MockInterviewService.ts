import api from "./api";

export const generateMockInterview = async( data : any) =>{
    try{
        const res = await api.post(
            "/candidate/mock-interview/generate",data
        );
        return res.data;
    }catch(error){
        console.error("Mock Interview Generation Error:", error);
        throw error;
    }
    
};
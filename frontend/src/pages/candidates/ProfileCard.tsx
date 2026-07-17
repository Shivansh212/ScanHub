import { useEffect, useState } from "react";
import { fetchme, type UserProfile } from "../../services/useService";

const ProfileCard = ({isUploading} : {isUploading : boolean}) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const loadProfile = async()=>{
            try{
                const data = await fetchme();
                setProfile(data);
            }
            catch(err){
                console.error("Failed to fetch profile", err);
            }
            finally{
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    if(loading){
        return(
            <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-slate-700 rounded w-1/2 mb-3" />
            </div>
        );
    }

    if(!profile){
        return null;
    }

    return (
        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

            <p className="text-slate-400 text-sm">Email</p>
            <p className="mb-3">{profile.email}</p>

            <p className="text-slate-400 text-sm">Role</p>
            <p className="capitalize mb-3">{profile.role}</p>

            <p className="text-slate-400 text-sm">Resume</p>
                <p
                className={`text-sm font-medium ${
                isUploading
                    ? "text-blue-400"
                    : profile.resume_uploaded
                 ? "text-green-400"
                    : "text-yellow-400"
                }`}
             >
                {isUploading
                ? "Uploading..."
                : profile.resume_uploaded
                ? "Uploaded"
                : "Not Uploaded"}
            </p>
        </div>
    );
};

export default ProfileCard;
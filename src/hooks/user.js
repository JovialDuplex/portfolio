import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { loremIpsum } from "lorem-ipsum";


const useUser =  function(){
    const navigate = useNavigate();
    const login = async(event, userData)=>{
        event.preventDefault();
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, userData.email, userData.password);
            console.log(userCredentials.user);
            
            const docRef = await addDoc(collection(db, "users"), {
                name: "Soh Takeuh",
                secondName: "jovial duplex",
                job: "fullstack web developer",
                description: loremIpsum({count: 3}),
                socialNetworks : [
                    {Icon: "FaLinkedin", href: "#", label: "linkedin"},
                    {Icon: "FaTwitter", href: "#", label: "Twitter"},
                    {Icon: "FaFacebookF", href: "#", label: "Facebook"},
                    {Icon: "FaGithub", href: "#", label: "GitHub"},
                    {Icon: "FaEnvelope", href: "#", label: "Email"},
                ],
            });

            navigate("/dashboard");

        } catch(error) {
            console.log(error.message);
        }
    }

    return {
        login, 
    }
};

export default useUser;
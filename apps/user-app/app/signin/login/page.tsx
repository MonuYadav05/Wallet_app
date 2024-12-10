import { Center } from "@repo/ui/center";
import { Login } from "../../../components/Login";


export default async function login() {
    return (
        <div className="md:w-screen mx-3 ms:mx-0 h-screen">
            
            <Center>

            <Login/>

            </Center>
        </div>
    )
}
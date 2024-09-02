import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
    // Hellooo ヽ(°□° )ノ
    
    const navigate = useNavigate();
    return (
        <div className="w-[100vw] h-[100vh] flex-center overflow-hidden">
            <Button onClick={() => navigate(`/products`)}>Products</Button>
        </div>
    )
};

export default Home;
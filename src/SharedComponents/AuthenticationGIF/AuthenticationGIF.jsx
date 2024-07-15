import { useLottie } from "lottie-react";
import animation from '../../assets/animation/skP4esipva.json'

const AuthenticationGIF = () => {
    const options = {
        animationData: animation,
        loop: true
      };
    
      const { View } = useLottie(options);
    return (
        <div>
            {
                View
            }
        </div>
    );
};

export default AuthenticationGIF;
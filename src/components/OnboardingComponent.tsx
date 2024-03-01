import { useEffect, useRef, useState } from "react";

const OnboardingComponent = () => {
  const isFirstTimeMount = useRef(true);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  useEffect(() => {
    if (isFirstTimeMount.current) {
      isFirstTimeMount.current = false;
      setShouldShowOnboarding(localStorage.getItem("isSecondTime") !== "true");
    }
    return () => {
      localStorage.setItem("isSecondTime", "true");
    };
  }, []);

  if (shouldShowOnboarding)
    return (
      <div>
        <h1>Onboarding Component</h1>
      </div>
    );
};

export default OnboardingComponent;

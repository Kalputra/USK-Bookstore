import { useState, useEffect, useRef } from "react";

export default function ScrollAnimation({
    children,
    animation = "fade-in-up",
    delay = 0,
    className = "",
    threshold = 0.1,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    // Biar animasinya jalan pas element keliatan di layar
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current);
                }
            },
            {
                threshold: threshold,
                rootMargin: "0px 0px -50px 0px",
            },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    // Mapping jenis animasi ke CSS class
    const animationClasses = {
        "fade-in": "animate-fade-in",
        "fade-in-up": "animate-fade-in-up",
        "fade-in-down": "animate-fade-in-down",
        "fade-in-left": "animate-fade-in-left",
        "fade-in-right": "animate-fade-in-right",
        "scale-in": "animate-scale-in",
    };

    return (
        <div
            ref={ref}
            className={`
                ${animationClasses[animation] || "animate-fade-in-up"}
                ${delay > 0 ? `delay-${delay}` : ""}
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                transition-all duration-700 ease-out
                ${className}
            `}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

// CSS keyframes buat animasi
const animationStyles = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from { 
            opacity: 0; 
            transform: translateY(30px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    @keyframes fadeInDown {
        from { 
            opacity: 0; 
            transform: translateY(-30px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    @keyframes fadeInLeft {
        from { 
            opacity: 0; 
            transform: translateX(-30px); 
        }
        to { 
            opacity: 1; 
            transform: translateX(0); 
        }
    }
    
    @keyframes fadeInRight {
        from { 
            opacity: 0; 
            transform: translateX(30px); 
        }
        to { 
            opacity: 1; 
            transform: translateX(0); 
        }
    }
    
    @keyframes scaleIn {
        from { 
            opacity: 0; 
            transform: scale(0.9); 
        }
        to { 
            opacity: 1; 
            transform: scale(1); 
        }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .animate-fade-in-down {
        animation: fadeInDown 0.6s ease-out forwards;
    }
    
    .animate-fade-in-left {
        animation: fadeInLeft 0.6s ease-out forwards;
    }
    
    .animate-fade-in-right {
        animation: fadeInRight 0.6s ease-out forwards;
    }
    
    .animate-scale-in {
        animation: scaleIn 0.4s ease-out forwards;
    }
    
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-500 { animation-delay: 500ms; }
`;

// Inject style ke head
export function useScrollAnimationStyles() {
    useEffect(() => {
        const styleId = "scroll-animation-styles";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = animationStyles;
            document.head.appendChild(style);
        }
    }, []);
}

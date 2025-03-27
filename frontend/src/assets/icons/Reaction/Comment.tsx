type IconPropType = {
    strokeClassName: string
  };
  
export const Comment = ({ strokeClassName }: IconPropType) => {
    return (
        <svg 
            width="19" 
            height="18" 
            viewBox="0 0 19 18" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_85_815)">
                <path 
                    d="M11.3288 14.1858C14.2081 14.1858 15.6481 14.1858 16.5422 13.3177C17.437 12.4503 17.437 11.0532 17.437 8.25991C17.437 5.46658 17.437 4.06954 16.5422 3.20213C15.6481 2.33398 14.2081 2.33398 11.3288 2.33398H8.27464C5.39536 2.33398 3.95534 2.33398 3.06124 3.20213C2.16638 4.06954 2.16638 5.46658 2.16638 8.25991C2.16638 11.0532 2.16638 12.4503 3.06124 13.3177C3.55983 13.8021 4.22792 14.0162 5.22051 14.1103" 
                    className={ strokeClassName }
                    stroke-width="1.48148" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                />
                <path 
                    d="M11.3286 14.1853C10.3849 14.1853 9.34499 14.5557 8.39592 15.0335C6.87038 15.8016 6.10761 16.1861 5.73195 15.9409C5.35629 15.6964 5.4273 14.9372 5.57008 13.4194L5.60215 13.0742" 
                        className={ strokeClassName }
                        stroke-width="1.48148" 
                        stroke-linecap="round"
                    />
            </g>
            <defs>
                <clipPath id="clip0_85_815">
                    <rect 
                        width="18.3248" 
                        height="17.7778" 
                        fill="white" 
                        transform="translate(0.639404 0.111328)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
  };
  

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  
};

const Button = ({ children, className = '', ...props } : ButtonProps) => {
  return (
    <button
      className={`h-8 px-3 mx-1 rounded-md bg-purple-600 text-white shadow-xl hover:bg-purple-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
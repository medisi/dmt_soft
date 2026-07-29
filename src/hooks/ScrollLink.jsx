export const ScrollLink = ({ to, children, className, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        const hash = typeof to === 'string' && to.startsWith('#') ? to.slice(1) : '';
        if (hash) {
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
        onClick?.();
    };

    return (
        <a href={to} onClick={handleClick} className={className}>
            {children}
        </a>
    )
};
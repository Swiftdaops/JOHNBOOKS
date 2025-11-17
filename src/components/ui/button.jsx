import React, { cloneElement } from 'react';

export function Button({ asChild = false, className = '', children, ...rest }) {
  if (asChild && React.isValidElement(children)) {
    // merge className and pass other props to child
    const child = React.Children.only(children);
    const merged = { className: [className, child.props.className].filter(Boolean).join(' '), ...rest };
    return cloneElement(child, merged);
  }

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;

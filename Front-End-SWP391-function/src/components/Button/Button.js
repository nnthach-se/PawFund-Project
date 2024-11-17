import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    className,
    primary,
    outline,
    disable,
    small,
    medium,
    large,
    xlarge,
    leftIcon,
    rightIcon,
    mgRight10,
    mgTop20,
    mgBottom20,
    width100,
    children,
    onClick,
    donateButton,
    adoptIntroduceButton,
}) {
    let Comp = 'button';
    // props để cho các prop như: to,href,function
    // ở dưới chúng ta cho mặc định nó có function onClick
    const props = {
        onClick,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    // ở đây là các thuộc tính css
    const classes = cx('wrapper', {
        primary,
        outline,
        disable,
        small,
        medium,
        large,
        xlarge,
        leftIcon,
        rightIcon,
        mgRight10,
        mgBottom20,
        mgTop20,
        width100,
        donateButton,
        adoptIntroduceButton,
        [className]: className, // có thể thêm css riêng
    });
    return (
        <Comp className={classes} {...props}>
            {children}
        </Comp>
    );
}

export default Button;

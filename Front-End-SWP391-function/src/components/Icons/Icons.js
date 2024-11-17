import ICONS from "~/assets/icons"
import styles from './Icons.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const CartIcon = () => <img src={ICONS.cartPri} alt="cart-icon" className={cx('icon-l')} />
export const HeartIcon = () => <img src={ICONS.heartPri} alt="heart-icon" className={cx('icon-l')} />
export const DogIcon = () => <img src={ICONS.dogPri} alt="dog-icon" className={cx('icon-l')}/>
export const NotiIcon = () => <img src={ICONS.notiPri} alt="noti-icon" className={cx('icon-l')} />
export const UserIcon = () => <img src={ICONS.userPri} alt="user-icon" className={cx('icon')} />

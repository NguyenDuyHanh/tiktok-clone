import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCircleXmark, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import {
    CoinIcon,
    HelpIcon,
    InboxIcon,
    LanguageIcon,
    LogoutIcon,
    MessageIcon,
    ProfileIcon,
    SearchIcon,
    SettingsIcon,
    ShortcutsIcon,
    UploadIcon,
} from '~/components/icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <HelpIcon />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <ShortcutsIcon />,
        title: 'Keyboard shortcuts',
        to: '/keyboard',
    },
];

function Header() {
    const currentUser = true;
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setSearchResults([]);
        }, 0);
    }, []);

    // handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // handle change to language
                break;
            default:
        }
    };

    const user_menu = [
        {
            icon: <ProfileIcon />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <CoinIcon />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <SettingsIcon />,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <LogoutIcon />,
            title: 'Log out',
            to: '/',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="TikTok" />
                <Tippy
                    interactive
                    visible={searchResults.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos"></input>
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <SearchIcon />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video" placement="bottom" delay={[0, 200]}>
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Message" placement="bottom" delay={[0, 200]}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom" delay={[0, 200]}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu items={currentUser ? user_menu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/1080x1080/tos-alisg-avt-0068/45cdacbd2595b03bfe09605f32520a2b.jpeg?lk3s=a5d48078&nonce=11543&refresh_token=c1d5ed8278bfd5d52cfd898f31007424&x-expires=1739412000&x-signature=Kzx0iQEq1OMlNcJvnRHaI7v6YgE%3D&shp=a5d48078&shcp=81f88b70"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;

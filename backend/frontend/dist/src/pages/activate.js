import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../hoc/auth/context';
import { useContext } from 'react';
import HeadFoot from '../components/HeadFoot';
import { Hyperlink } from '../components/Hyperlink';
import { Button } from '../components/Button';
import { PaperPlane } from '../assets/icons/Icons';
const determineDomain = (email) => {
    let domain = email.split('@')[1] ?? email;
    if (domain.includes('gmail'))
        domain = 'https://mail.google.com/mail/u/0/';
    else if (domain.includes('outlook') || domain.includes('hotmail'))
        domain = 'https://outlook.live.com/mail/0/inbox';
    else if (domain.includes('yahoo'))
        domain = 'https://mail.yahoo.com/d/folders/1';
    else if (domain.includes('icloud'))
        domain = 'https://www.icloud.com/#mail';
    else if (domain.includes('zoho'))
        domain = 'https://mail.zoho.com/zm/#mail/folder/inbox';
    else if (domain.includes('aol'))
        domain = 'https://mail.aol.com/webmail-std/en-us/suite';
    else if (domain.includes('yandex'))
        domain = 'https://mail.yandex.com/';
    else if (domain.includes('protonmail'))
        domain = 'https://mail.protonmail.com/inbox';
    else if (domain.includes('tutanota'))
        domain = 'https://mail.tutanota.com/';
    else if (domain.includes('gmx'))
        domain = 'https://www.gmx.com/';
    else if (domain.includes('mail'))
        domain = 'https://www.mail.com/';
    else if (domain.includes('fastmail'))
        domain = 'https://www.fastmail.com/mail/';
    else
        domain = '';
    return domain;
};
const Activate = () => {
    const { t } = useTranslation();
    const { email, activateUser } = useContext(AuthContext);
    const { token } = useParams();
    const domain = determineDomain(email ?? '');
    if (token) {
        activateUser(token);
    }
    return (_jsx(HeadFoot, { children: _jsxs("div", { className: "flex h-full flex-col items-center justify-center", children: [_jsx("div", { className: "h-64 w-64 overflow-hidden rounded-full", children: _jsx(PaperPlane, {}) }), _jsxs("div", { className: "flex flex-col items-center justify-center px-28", children: [_jsx("h2", { className: "my-4 text-center text-2xl font-bold", children: t('activate.Thanks') }), _jsx("p", { className: " text-center", children: t('activate.ConfirmationSent') }), domain !== '' ? (_jsx(Button, { linkTo: domain, className: "mt-4 rounded  px-3 py-2 font-bold text-secondaryYellow-500 duration-200 ease-in-out transition", bgColor: "zinc-800 ", children: t('activate.GoToMail') })) : null, _jsxs("p", { className: "mt-8 text-center text-xs", children: [t('activate.NoEmail'), _jsx("br", {}), t('activate.CheckSpam'), _jsx(Hyperlink, { to: "/login", color: "pink", children: t('activate.resend') })] })] })] }) }));
};
export default Activate;

import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../hoc/auth/context';
import { useContext } from 'react';

const determineDomain = (email: string) => {
    let domain = email;
    if (domain.includes('gmail')) domain = 'https://mail.google.com/mail/u/0/';
    else if (domain.includes('outlook') || domain.includes('hotmail'))
        domain = 'https://outlook.live.com/mail/0/inbox';
    else if (domain.includes('yahoo'))
        domain = 'https://mail.yahoo.com/d/folders/1';
    else if (domain.includes('icloud')) domain = 'https://www.icloud.com/#mail';
    else if (domain.includes('zoho'))
        domain = 'https://mail.zoho.com/zm/#mail/folder/inbox';
    else if (domain.includes('aol'))
        domain = 'https://mail.aol.com/webmail-std/en-us/suite';
    else if (domain.includes('yandex')) domain = 'https://mail.yandex.com/';
    else if (domain.includes('protonmail'))
        domain = 'https://mail.protonmail.com/inbox';
    else if (domain.includes('tutanota')) domain = 'https://mail.tutanota.com/';
    else if (domain.includes('gmx')) domain = 'https://www.gmx.com/';
    else if (domain.includes('mail')) domain = 'https://www.mail.com/';
    else if (domain.includes('fastmail'))
        domain = 'https://www.fastmail.com/mail/';
    else domain = '';
    return domain;
};

const Activate: React.FC = () => {
    const { t } = useTranslation();
    const { email, activateUser } = useContext(AuthContext);
    const { token } = useParams<{ token: string }>();

    const domain = determineDomain(email ?? '');

    if (token) {
        activateUser(token);
    }

    return (
        <div className="flex h-full flex-col items-center bg-white ">
            <div className="h-2/5 w-auto overflow-hidden">
                <img
                    src="/img/emailSent.jpg"
                    alt={t('activate.Sent')}
                    className="h-full min-w-full object-cover"
                />
            </div>
            <div className="align-center flex flex-col px-28">
                <h2 className="my-4 text-center text-2xl font-bold">
                    {t('activate.Thanks')}
                </h2>
                <p className=" text-center">{t('activate.ConfirmationSent')}</p>
                {domain !== '' ? (
                    <Link
                        to={domain}
                        className="mx-44 mt-8 rounded bg-tiviElectricPurple-100 p-4 text-center font-bold transition duration-300 ease-in-out hover:bg-tiviElectricViolet"
                    >
                        {t('activate.GoToMail')}
                    </Link>
                ) : null}

                <p className="mt-8 text-center text-xs">
                    {t('activate.NoEmail')}

                    <br />
                    {t('activate.CheckSpam')}
                    {/* TODO: Hacer algo para el resend */}
                    <Link to="/login" className="text-tiviElectricViolet">
                        {t('activate.resend')}
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default Activate;

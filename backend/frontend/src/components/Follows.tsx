import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from '@nextui-org/react';
import UserList from './UserList';
import { Follow } from '../utils/types';
import { t } from 'i18next';
export interface IFollowsProps {
    type: 'followers' | 'following';
    follows: Follow[];
}

const Follows: React.FunctionComponent<IFollowsProps> = ({ type, follows }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    let users = null;
    let followButton = null;
    if (type === 'followers') {
        users = follows.map((follow) => follow.follower);
        followButton = (
            <button className="text-sm text-gray-500 hover:text-gray-700">
                {t('profile.follow')}
            </button>
        );
    }
    if (type === 'following') {
        users = follows.map((follow) => follow.followed);
    }

    const capitalize = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={onOpen}
                className="text-sm text-gray-500 hover:text-gray-700"
                {...(follows.length === 0 && { disabled: true })}
            >
                {follows.length} {t('profile.' + capitalize)}
            </button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {capitalize}
                        </ModalHeader>
                        <ModalBody>
                            <UserList users={users??[]}>{followButton}</UserList>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Follows;

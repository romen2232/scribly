import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import UserList from "./UserList";
import { t } from "i18next";
import { listLeaderboards } from "../services/leaderboards";
import { useEffect, useState } from "react";
import { Leaderboard } from "../utils/types";

export interface ILeaderBoardProps {}
const Leaderboard = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [leaderboard, setLeaderboard] = useState<Leaderboard>();

    //TODO: This is a piece of shit
    useEffect(() => {
        ().then((leaderboard) => {
            setLeaderboard(leaderboard);
        });
    }, []);

    return (
        <>
            <button onClick={onOpen}>{t("leaderboard")}</button>
            <Modal isOpen={isOpen} onClose={onOpenChange}>
                <ModalContent>
                    <ModalHeader>{t("leaderboard")}</ModalHeader>
                    <ModalBody>
                        <UserList users={leaderboard} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
    )

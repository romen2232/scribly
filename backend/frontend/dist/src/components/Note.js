import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAutosave } from '../hooks/useAutosave';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FolderIcon, GemIcon } from '../assets/icons/Icons';
import { t } from 'i18next';
import { formatDate } from '../utils/functions';
import { useNoteStore } from '../stores/noteStore';
import { destroyNote, analyzeNote } from '../services/notes';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import { Modal, ModalBody, ModalHeader, ModalContent, useDisclosure, ModalFooter, } from '@nextui-org/react';
import { Tree } from './Tree';
// import { AnswerProps } from '../utils/types';
import { rootFolder } from '../services/folders';
import useVisibility from '../hooks/useVisibility';
import { retrieveUser } from '../services/auth';
import Loader from '../pages/loader';
import { Button } from './Button';
//TODO: Tab index is not working as intendeed
export function Note({ note, folder, onNoteChange, updateURL }) {
    const { currentNote, saveNote, undo, redo, localSaveNote } = useNoteStore();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [newNote, setNewNote] = useState({});
    const [folderTree, setFolderTree] = useState();
    const [newFolder, setNewFolder] = useState();
    const cookies = parseCookies();
    const [publicNote, setPublicNote] = useState(false);
    const [gems, setGems] = useState(0);
    const [waitingForAnalysis, setWaitingForAnalysis] = useState(false);
    const [folderOrAnalysis, setFolderOrAnalysis] = useState('folder');
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [parsedAnalysis, setParsedAnalysis] = useState([[]]);
    const [noteRef, isNoteVisible] = useVisibility();
    useEffect(() => {
        retrieveUser(cookies[AUTH_COOKIE_NAME]).then((response) => {
            setGems(response.gems ?? 0);
        });
    }, []);
    // Update note as soon as it's passed as prop
    useEffect(() => {
        setNewNote(note);
        setNewFolder(folder);
        setPublicNote(note.public ?? false);
    }, [note]);
    useEffect(() => {
        if (!newFolder)
            return;
        setNewNote({
            ...newNote,
            folder: newFolder,
            public: publicNote,
        });
        saveNote({
            ...newNote,
            folder: newFolder,
            public: publicNote,
        });
    }, [newFolder, publicNote]);
    useEffect(() => {
        if (!isNoteVisible) {
            handleUnmount(newNote);
        }
    }, [isNoteVisible]);
    // Save note on unmount
    useEffect(() => {
        updateRootFolder();
        return () => {
            handleUnmount(newNote);
        };
    }, []);
    // Keyboard shortcuts for saving, undo and redo
    useKeyboardShortcuts({
        save: async () => {
            await saveNote(newNote);
            if (onNoteChange) {
                onNoteChange(newNote);
            }
        },
        undo: () => {
            undo();
            setNewNote(currentNote);
        },
        redo: () => {
            redo();
            setNewNote(currentNote);
        },
    });
    // Autosave note every minute
    useAutosave({
        data: newNote.noteContent ?? '',
        onSave: async (data) => {
            const updatedNote = {
                ...newNote,
                noteLastModified: new Date().toISOString(),
                noteContent: data,
            };
            await saveNote(updatedNote);
            setNewNote(updatedNote);
        },
        interval: 60000,
    });
    /**
     * Save note on beforeunload
     * Destroy note if it's empty
     */
    const handleUnmount = async (note) => {
        if (note.noteContent === '' && note.noteName === '' && note.id) {
            await destroyNote(note.id, cookies[AUTH_COOKIE_NAME]);
        }
        else {
            await saveNote({
                ...note,
                noteLastModified: formatDate(new Date()),
            });
        }
    };
    const updateRootFolder = () => {
        rootFolder(cookies[AUTH_COOKIE_NAME])
            .then((response) => {
            setFolderTree(response);
        })
            .catch((error) => {
            console.log(error);
        });
    };
    const changeFolder = (folder) => {
        setNewFolder(folder);
        if (updateURL && folder.id) {
            updateURL(folder.id);
        }
        onOpenChange();
    };
    const fadeInDown = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };
    const handleAnalyzeNote = async (note) => {
        const id = note.id;
        const token = cookies[AUTH_COOKIE_NAME];
        if (gems < 100 || waitingForAnalysis)
            return;
        try {
            if (id != undefined) {
                setWaitingForAnalysis(true);
                openAnalysis();
                const result = await analyzeNote(id, note, token);
                if (result.noteAnalysis === undefined)
                    throw new Error(t('note.AnalysisError'));
                setParsedAnalysis(parseAnalysis(result.noteAnalysis));
                localSaveNote({
                    ...result,
                    noteLastModified: formatDate(new Date()),
                });
                setWaitingForAnalysis(false);
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    /**
     * Parses the analysis string
     * @param analysis
     * @returns A 2D array with the titles and the text of the analysis
     */
    const parseAnalysis = (analysis) => {
        const analysisArray = analysis.replace('\\n\\n', '').split('**');
        const parsedAnalysis = [];
        for (let i = 1; i < analysisArray.length; i += 2) {
            const title = analysisArray[i];
            const text = analysisArray[i + 1];
            parsedAnalysis.push([title, text]);
        }
        return parsedAnalysis;
    };
    const openFolder = () => {
        setFolderOrAnalysis('folder');
        onOpen();
    };
    const openAnalysis = () => {
        setFolderOrAnalysis('analysis');
        onOpen();
    };
    return (_jsxs(motion.div, { ref: noteRef, className: "flex h-full flex-col overflow-hidden", children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "w-full", children: [_jsx(motion.input, { initial: "hidden", animate: "visible", variants: fadeInDown, transition: { duration: 0.5 }, type: "text", name: "title", id: "title", className: "h-16 w-full bg-mainBackground-200 p-16 md:text-5xl sm:text-4xl text-7xl placeholder-gray-500 focus:placeholder-gray-600 focus:outline-none", placeholder: t('note.Title'), autoFocus: true, autoComplete: "off", value: newNote.noteName ?? '', onChange: (e) => setNewNote({
                                    ...newNote,
                                    noteName: e.target.value,
                                }) }), _jsx("div", { className: "pointer-events-none flex justify-between px-16", children: _jsx("p", { className: "text-2xl text-gray-500", children: formatDate(new Date(newNote.noteLastModified ?? '')) }) })] }), _jsxs("div", { className: "flex flex-col", children: [newFolder?.id && (_jsxs("button", { className: `hover:bg-hover:shadow  mx-16  my-2 flex h-min cursor-pointer items-center justify-between rounded-md p-3 duration-300 ease-in-out transition hover:text-primaryBlue-600 hover:shadow-lg`, tabIndex: 2, onClick: openFolder, children: [_jsx(FolderIcon, { className: "h-10 w-10" }), (newFolder?.depth ?? 0) > 0 && (_jsx("div", { className: "px-3 text-lg", children: _jsx("h4", { className: "font-bold", children: newFolder?.folderName }) }))] })), _jsxs("label", { className: "flex cursor-pointer flex-col items-center justify-center", children: [_jsxs("div", { className: "relative inline-flex items-center", children: [_jsx("input", { type: "checkbox", checked: publicNote, className: "peer sr-only", onChange: () => {
                                                    setPublicNote(!publicNote);
                                                } }), _jsx("div", { className: "peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:content-[''] after:transition-all peer-checked:bg-primaryPink-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primaryPink-200" })] }), _jsx("span", { className: "pt-2 text-sm font-medium text-gray-900 dark:text-gray-300", children: "Public" })] }), _jsxs("button", { className: ` mx-16 my-2 flex h-min flex-col items-center justify-between rounded-md p-3 duration-300 ease-in-out transition  ${gems < 100 || waitingForAnalysis
                                    ? 'cursor-default  opacity-50'
                                    : 'hover:bg-hover:shadow cursor-pointer  hover:text-primaryBlue-600 hover:shadow-lg'}`, tabIndex: 2, onClick: () => handleAnalyzeNote(newNote), children: [_jsx(GemIcon, { className: "h-10 w-10" }), _jsx("h4", { className: "px-3 text-lg font-bold", children: gems })] })] })] }), _jsx("textarea", { name: "text", id: "text", value: newNote.noteContent ?? '', onChange: (e) => setNewNote({
                    ...newNote,
                    noteContent: e.target.value,
                }), tabIndex: 1, className: "m-24 mb-12 mt-16 h-full overflow-scroll bg-mainBackground-200 text-2xl focus:placeholder-gray-500 focus:outline-none", placeholder: "En alg\u00FAn lugar de la Mancha, de cuyo nombre no quiero acordarme..." }), _jsx(Modal, { isOpen: isOpen, onOpenChange: onOpenChange, placement: "top-center", className: "bg-mainBackground-200", children: _jsx(ModalContent, { children: (onClose) => {
                        return folderOrAnalysis === 'folder' ? (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { children: _jsx("h1", { className: "text-2xl font-bold", children: t('folders.Title') }) }), _jsx(ModalBody, { children: _jsx(Tree, { rootFolder: folderTree, onlyFolders: true, changeFolder: changeFolder }) })] })) : (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { children: _jsx("h1", { className: "text-2xl font-bold", children: parsedAnalysis[currentSectionIndex][0] }) }), waitingForAnalysis ? (_jsx(ModalBody, { children: _jsx(Loader, { text: t('loading.Longer') }) })) : (_jsxs(_Fragment, { children: [_jsx(ModalBody, { children: _jsx("div", { className: "flex flex-col items-center justify-center", children: _jsx("p", { className: "text-xl", children: parsedAnalysis[currentSectionIndex][1] }) }) }), _jsx(ModalFooter, { children: _jsx(Button, { className: `rounded-xl
                                             p-4 font-semibold hover:shadow-[0px_0px_5px_rgba(0,0,0,0.35)]
                                    `, bgColor: 'primaryPink-500', onClick: () => {
                                                    currentSectionIndex <
                                                        parsedAnalysis.length - 1
                                                        ? setCurrentSectionIndex(currentSectionIndex +
                                                            1)
                                                        : onClose();
                                                }, children: currentSectionIndex <
                                                    parsedAnalysis.length - 1
                                                    ? t('notes.Next')
                                                    : t('notes.Close') }) })] }))] }));
                    } }) })] }));
}

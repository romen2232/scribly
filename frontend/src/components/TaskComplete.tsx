import { useState, useEffect } from 'react';

type Task = {
  taskName: string;
  taskDescription: string;
  taskPoints: number;
  text: string;
};

type TaskCompleteProps = {
  task: Task;
  onCorrect?: () => void;
  onIncorrect?: () => void;
};

const TaskComplete: React.FC<TaskCompleteProps> = ({ task, onCorrect, onIncorrect }) => {
  const [sentences, setSentences] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<number | null>(null);
  const [filledWords, setFilledWords] = useState<(string | null)[]>(new Array(words.length).fill(null));


  useEffect(() => {
    const regex = /\[(.*?)\]/g;
    const extractedWords: string[] = [];
    const strippedText = task.text.replace(regex, (_) => {
      extractedWords.push(_);
      return '___';  // This will be used as a placeholder for the missing word
    });
    setSentences(strippedText.split('\n\n'));
    setWords(extractedWords.sort(() => Math.random() - 0.5));
    setFilledWords(new Array(extractedWords.length).fill(null));
  }, [task.text]);

  const handleWordChoice = (word: string, wordIndex: number) => {
    if (selectedSentenceIndex !== null) {
        const filledWordsCopy = [...filledWords];
        if (filledWordsCopy[wordIndex]) {
            filledWordsCopy[wordIndex] = null;
          } else {
            filledWordsCopy[wordIndex] = word;
          }
          setFilledWords(filledWordsCopy);

      const originalWord = words[selectedSentenceIndex];
      if (word === originalWord) {
        onCorrect && onCorrect();
      } else {
        onIncorrect && onIncorrect();
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{task.taskName}</h2>
      <p className="text-lg">{task.taskDescription}</p>
      <div className="space-y-2">
        {sentences.map((sentence, sIndex) => (
          <div
            key={sIndex}
            className={`p-2 border cursor-pointer ${sIndex === selectedSentenceIndex ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => setSelectedSentenceIndex(sIndex)}
          >
            {sentence.split('___').map((part, idx) => (
              <span key={idx}>
                {part}
                {idx !== sentence.split('___').length - 1 && (
                  <span className="bg-yellow-300 p-1 mx-1">
                    {filledWords[sIndex] || '...'}
                  </span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        {words.map((word, index) => (
          <button
            key={index}
            className={`p-2 border rounded hover:bg-blue-200 ${filledWords[index] ? 'opacity-50' : ''}`}
            onClick={() => handleWordChoice(word, index)}
            disabled={!!filledWords[index]}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskComplete;

'use client';
import query from '@/types/query';
import Prompt from './Prompt';
import useKeyboardShortcuts from '@/app/hooks/useKeyboardShortcuts';
import { parser, handleExit } from '@/utils/commandParser';
import React, { useState } from 'react';

function Terminal() {
    const [userInput, setUserInput] = useState('');
    const [prevQueries, setPrevQueries] = useState<query[]>([]);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        const command = userInput;
        if(command === 'clear'){
            setPrevQueries([]);
        } else if (command === 'exit') {
            handleExit();
        } else {
            const output = await parser(command);
            setPrevQueries(prev => [
                ...prev,
                {
                    command,
                    output
                }
            ]);
        }
        setUserInput('');
    };

    useKeyboardShortcuts((event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'l') {
            setPrevQueries([]);
            event.preventDefault();
        } else if (event.key === 'Tab') {
            // TODO: Get completions from commandParser api
            setUserInput('help');
            event.preventDefault();
        }
    });

    return (
        <div className="h-screen w-screen p-2 font-ibm-mono">
            <div className="h-full w-full overflow-y-auto rounded-xl border-2 border-white p-8">
                <div className="flex flex-col">
                    <div className="mb-8 ml-2">
                        <pre>
                            {`___       __    ______                            
__ |     / /_______  /__________________ ________ 
__ | /| / /_  _ \\_  /_  ___/  __ \\_  __ \`__ \\  _ \\
__ |/ |/ / /  __/  / / /__ / /_/ /  / / / / /  __/
____/|__/  \\___//_/  \\___/ \\____//_/ /_/ /_/\\___/
`}
                        </pre>
                        <div className="mt-4 flex flex-col">
                            <p>Type 'help' to see the list of available commands</p>
                            <p>Type 'fetch' to display summary</p>
                            <p>
                                {"Type 'resume' or click "}
                                <a
                                    href="https://drive.google.com/file/d/1e-aZEhiXeUC6Nnr8HvIF0VjaSw2v1zjo/view?usp=sharing"
                                    target="_blank"
                                    className="underline">
                                    here
                                </a>
                                {' to view resume'}
                            </p>
                        </div>
                    </div>
                    <div className={`${prevQueries.length > 0 && 'mt-2'} flex flex-col gap-2`}>
                        {prevQueries.map((query, index) => (
                            <div key={index}>
                                <div className="flex flex-row space-x-2">
                                    <Prompt />
                                    <div className="flex-grow">{query.command}</div>
                                </div>
                                <p className="whitespace-pre-wrap">{query.output}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleCommand} className="mt-2" id='prompt'>
                        <div className="flex flex-row space-x-2">
                            <Prompt />
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={e => setUserInput(e.target.value)}
                                    className="w-full flex-grow bg-transparent caret-transparent focus:border-transparent focus:outline-none"
                                    autoFocus
                                />
                                <div
                                    id='caret'
                                    className="pointer-events-none absolute bg-white"
                                    style={{
                                        height: '1.2em',
                                        width: '0.6em',
                                        left: `${userInput.length}ch`,
                                        top: '0.2em'
                                    }}></div>
                            </div>
                        </div>
                        {/* TODO: Implement a Loader for parser */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Terminal;

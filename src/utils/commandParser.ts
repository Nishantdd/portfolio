import responses from './commands.json';

const getTokens = (s: string): string[] => {
    if (s.length === 0) return [''];
    return s.trim().split(' ');
};

const resolve = (res: string) => Promise.resolve(res);

const getCompletion = (query: string): Promise<string> => {
    const availableCommands = [
        'about',
        'banner',
        'cd',
        'date',
        'echo',
        'emacs',
        'email',
        'exit',
        'fetch',
        'github',
        'help',
        'linkedin',
        'ls',
        'nvim',
        'projects',
        'pwd',
        'quote',
        'readme',
        'resume',
        'sudo',
        'vi',
        'vim',
        'weather',
        'whoami'
    ];

    for (let command of availableCommands) {
        if (command.startsWith(query)) {
            return resolve(command);
        }
    }

    return resolve(query);
};

const parser = async (query: string): Promise<string> => {
    if (query.length === 0) return Promise.resolve('');
    const tokens = getTokens(query);

    const ctx = {
        command: tokens[0],
        parameters: tokens.slice(1)
    };

    const availableCommands: string[] = Object.keys(responses);
    if (availableCommands.find(value => value === ctx.command)) {
        return resolve(responses[ctx.command as keyof typeof responses]);
    } else if (ctx.command === 'echo') {
        return resolve(ctx.parameters.join(' '));
    } else if (ctx.command === 'resume') {
        window.open('https://drive.google.com/file/d/1e-aZEhiXeUC6Nnr8HvIF0VjaSw2v1zjo/view?usp=sharing', '_blank');
        return resolve('Opening resume in new tab...');
    } else if (ctx.command === 'date') {
        const date = new Date();
        return resolve(date.toLocaleString().toString());
    } else if (ctx.command === 'email') {
        window.open('mailto:nishant.dahiya2000@gmail.com', '_blank');
        return resolve('Opening mailto:nishant.dahiya2000@gmail.com...');
    } else if (ctx.command === 'github') {
        window.open('https://github.com/Nishantdd', '_blank');
        return resolve('Opening github in new tab...');
    } else if (ctx.command === 'linkedin') {
        window.open('https://www.linkedin.com/in/nishant-dahiya-322038232/', '_blank');
        return resolve('Opening linkedin in new tab...');
    } else if (ctx.command === 'quote') {
        const res = await fetch('/api/quotes');
        const { quote, author }: { quote: string; author: string } = await res.json();
        return resolve(`${quote}\n -${author}`);
    } else if (ctx.command === 'weather') {
        if (ctx.parameters.length === 0) {
            return resolve('Usage: weather [location_name]\nExample: weather Oymyakon');
        } else {
            const res = await fetch(`/api/weather/${ctx.parameters.join('+')}`);
            const { weather } = await res.json();
            console.log(weather);
            return resolve(weather);
        }
    } else {
        return resolve(`shell: command not found: ${ctx.command}. Try 'help' to get started.`);
    }
};

export { parser, getCompletion };

import githubReposeResponse from '@/types/githubReposResponse';

export async function GET(): Promise<Response> {
    try {
        const response = await fetch('https://api.github.com/users/Nishantdd/repos');
        if (response.status > 400) {
            return Response.json(
                {
                    success: false,
                    projects: 'Failed to retrieve projects from github.'
                },
                { status: 424 }
            );
        }

        let allProjects: githubReposeResponse[] = await response.json();
        allProjects.sort((a, b) => b.stargazers_count - a.stargazers_count);
        allProjects = allProjects.filter(project => {
            if (project.name === 'Nishantdd') return false;
            if (project.name.includes('dotfiles')) return false;
            return true;
        });

        const formattedProjects = allProjects.map(project => {
            const formattedProject = `<span style="color: yellow;">${project.name}</span> - ${project.description} - ☆ ${project.stargazers_count}`;
            return `<a href="${project.html_url}" target="_blank" style="text-decoration: none;" onmouseover="this.style.textDecoration='underline';" onmouseout="this.style.textDecoration='none';">${formattedProject}</a>`;
        });

        const projects = formattedProjects.join('\n');

        return Response.json(
            {
                success: true,
                projects
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error occured while fetching github projects: ', (err as Error).message);
        return Response.json(
            {
                success: false,
                projects: 'Internal server error. Please try again later.'
            },
            { status: 500 }
        );
    }
}

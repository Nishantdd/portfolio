export async function GET(
    reqeust: Request,
    {
        params
    }: {
        params: Promise<{ location: string }>;
    }
): Promise<Response> {
    try {
        const { location } = await params;

        const response = await fetch(`https://wttr.in/${location}?0ATm`);

        if (response.status === 404) {
            return Response.json(
                {
                    success: false,
                    weather: 'No weather report found for the provided location.'
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                weather: await response.text()
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error occured while fetching weather report: ', (err as Error).message);

        return Response.json(
            {
                success: false,
                weather: 'Internal server error. Please try again later.'
            },
            { status: 500 }
        );
    }
}

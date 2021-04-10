import ReactGA from 'react-ga';

export default function AnaliticsEvents(props: string) {
    ReactGA.event({
        category: 'Shortcut',
        action: `Access in ${props}`
    })
}
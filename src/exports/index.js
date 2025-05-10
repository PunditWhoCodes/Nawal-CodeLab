import { code, db, globe, lock } from "../assets/icons";
import client1 from '../assets/images/client1.png'
import client2 from '../assets/images/client2.png'
import client3 from '../assets/images/client3.png'
import client4 from '../assets/images/client4.png'

export const aboutgrids = [
    {
        icon: code,
        heading: 'Frontend Development',
        text: 'Master Frontend Development essentials for creating sleek, responsive user interfaces in our concise course.',
        label: 'View More'
    },
    {
        icon: db,
        heading: 'Database Management',
        text: 'Unlock the power of Database Management for seamless data organization and retrieval across applications.',
        label: 'View More'
    },
    {
        icon: globe,
        heading: 'Full Stack Development',
        text: 'Master the art to create seamless user experiences and powerful server-side applications in one comprehensive program.',
        label: 'View More'
    },
    {
        icon: lock,
        heading: 'Cyber Security',
        text: 'Master the cybersecurity essentials in our expert-led course, equipping you to safeguard the digital assets in an evolving threat landscape.',
        label: 'View More'
    }
];


export const clients = [
    {
        image: client1,
        about: 'The content is top notch and the teachers are folks I know and can trust what they are teaching because of their reputation as outstanding engineers.',
        name: 'Auj Singh',
        profile: 'Full Stack Developer'
    },

    {
        image: client2,
        about: 'Nawals CodeLab should be in every developers tool kit. - Wide range of course topics - World class teachers - Full learning paths to go from zero to hero.',
        name: 'Akela Jhons',
        profile: 'Frontend Developer'
    },

    {
        image: client3,
        about: 'Nawals CodeLab is one of the highest ROI investments I have made last year from education point of view High quality lecturers & content meant for advanced learners',
        name: 'Karunal Sharma',
        profile: 'Data Scientist'
    },

    {
        image: client4,
        about: 'Investing in Nawals CodeLab last year has been one of my most rewarding educational decisions, offering unparalleled returns on investment. With top-notch instructors and content tailored for advanced learners.',
        name: 'Dipti Verma',
        profile: 'Full Stack Developer'
    }
]


export const pricing = [
    {
        plan : 'Starter Plan',
        price : 'Free',
        label : 'Proceed Free',
        about : 'Access introductory lectures of all courses, no workshops access.'
    },

    {
        plan : 'Yearly Plan',
        price : '$108/year',
        label : 'Proceed Anually',
        about : 'Billed yearly. Access all in-depth courses, workshops, and mobile apps.'
    },

    {
        plan : 'Monthly Plan',
        price : '$12/month',
        label : 'Proceed Monthly',
        about : 'Billed monthly. Access all in-depth courses, workshops, and mobile apps.'


    }
]
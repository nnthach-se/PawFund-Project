import Home from '~/pages/Home/Home';
import About from '~/pages/About/About';
import FindPet from '~/pages/FindPet';
import Blog from '~/pages/Blog/Blog';
import Contact from '~/pages/Contact/Contact';
import Donate from '~/pages/Donate/Donate';
import Admin from '~/pages/Admin/Admin';
import Login from '~/pages/Login';
import Register from '~/pages/Register/Register';
import Event from '~/pages/Event';
import PetDetail from '~/pages/PetDetail';
import Volunteer from '~/pages/Volunteer/Volunteer';
import Application from '~/pages/Application/Application';
import DonateSuccess from '~/pages/Donate/DonateComponents/DonateSuccess';
import BlogDetail from '~/pages/BlogDetail';
import EventDetail from '~/pages/EventDetail';
import Account from '~/pages/Account';
import Adopt from '~/pages/Adopt/Adopt';
import ShowAllApplication from '~/pages/Application/ApplicationComponents/ShowAllApplication/ShowAllApplication';
import ShowAllPetAdopted from '~/pages/ShowAllPetAdopted/ShowAllPetAdopted';
import ShowAllPetDetail from '~/pages/ShowAllPetAdopted/ShowAllPetAdopted/ShowAllPetDetail';
import ApplicationDetails from '~/pages/Account/components/Application/ApplicationComponents/ApplicationDetails';
import ApplicationUpdate from '~/pages/Account/components/Application/ApplicationComponents/ApplicationUpdate';
import AdopterFeedback from '~/pages/AdopterFeedback/AdopterFeedback';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/my-application',
        component: ShowAllApplication,
    },
    {
        path: '/blog-detail/:id',
        component: BlogDetail,
    },
    {
        path: '/my-pet-detail/:id',
        component: ShowAllPetDetail,
    },
    {
        path: '/my-application-detail/:id',
        component: ApplicationDetails,
    },
    {
        path: '/my-application-update/:id',
        component: ApplicationUpdate,
    },

    {
        path: '/my-pet',
        component: ShowAllPetAdopted,
    },
    {
        path: '/adopt-application/:id',
        component: Application,
    },
    {
        path: '/adopt',
        component: Adopt,
    },
    {
        path: '/about-us',
        component: About,
    },
    {
        path: '/find-a-pet',
        component: FindPet,
    },
    {
        path: '/pet-detail/:id',
        component: PetDetail,
    },
    {
        path: '/blog',
        component: Blog,
    },
    {
        path: '/blog-detail',
        component: BlogDetail,
    },
    {
        path: '/events',
        component: Event,
    },
    {
        path: '/event-detail',
        component: EventDetail,
    },
    {
        path: '/volunteer',
        component: Volunteer,
    },
    {
        path: '/contact',
        component: Contact,
    },
    {
        path: '/donate',
        component: Donate,
    },
    {
        path: '/donate/:id',
        component: Donate,
    },
    {
        path: 'thanks',
        component: DonateSuccess,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        component: Register,
        layout: null,
    },
    {
        path: '/account',
        component: Account,
    },
    {
        path: '/adopter-feedback/:id',
        component: AdopterFeedback,
    },
];

const privateRoutes = [
    {
        path: '/admin',
        component: Admin,
        layout: null,
    },
];

export { publicRoutes, privateRoutes };

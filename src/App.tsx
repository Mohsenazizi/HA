import { Switch, Route, Redirect } from 'react-router-dom';
import { Characters, Profile, NotFound } from './pages';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools/>
            <main>
                <Switch>
                    <Route path='/characters/:id' component={Profile}/>
                    <Route path='/characters' component={Characters}/>
                    <Redirect from='/' exact to='/characters' />
                    <Route component={NotFound}/>
                </Switch>
            </main>
        </QueryClientProvider>
    )
}

export default App;

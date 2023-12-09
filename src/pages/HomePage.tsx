import { useNavigate } from 'react-router-dom';
import messages from '../api/messages/messages.json';
import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import { Button } from '@nextui-org/react';
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <TabWrapper>
      <section className="flex gap-20 items-center h-full">
        <article className="flex sm:flex-row sm:text-x2l flex-col justify-center align-center items-center gap-10 h-min w-auto bg-primary/60 p-4 rounded-lg mx-10 text-md text-justify shadow-lg">
          <img
            className="rounded-full sm:w-64 w-28"
            src="https://media.tenor.com/NqO231sqojIAAAAM/nerd-emoji-nerd.gif"
          />
          <p className="flex flex-col justify-center items-center mx-2">
            <span>{messages.description}</span>
            <Button
              onClick={() => navigate('/explore')}
              className="mt-8 w-32"
              variant="flat"
              color="success"
            >
              {messages.getStarted}
            </Button>
          </p>
        </article>
      </section>
    </TabWrapper>
  );
};

export default HomePage;

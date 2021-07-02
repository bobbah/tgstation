import { Section } from '../components';
import { Window } from '../layouts';
import { useBackend } from '../backend';

export const Adminhelp = (props, context) => {
  const { act, data } = useBackend(context);

  return (
    <Window width={500} height={600}>
      <Window.Content scrollable>
        <Section title="Adminhelp">
          {JSON.stringify(data)}
        </Section>
      </Window.Content>
    </Window>
  );
};

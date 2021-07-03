import { Section, Box, Button } from '../components';
import { Window } from '../layouts';
import { useBackend } from '../backend';
import { sanitizeText } from '../sanitize';

const mapState = (state) => {
  switch (state) {
    case 1:
      return 'OPEN';
    case 2:
      return 'CLOSED';
    case 3:
      return 'RESOLVED';
    default:
      return 'ERROR, CONTACT CODER';
  }
};

export const Adminhelp = (props, context) => {
  const { act, data } = useBackend(context);
  const {
    id,
    name,
    state,
    opened_at,
    closed_at,
    opened_age,
    closed_age,
    disconnected,
    interactions,
    responding,
    related_tickets,
  } = data;

  const timestampPattern = /^([0-9]{2}:[0-9]{2}:[0-9]{2}):/;
  const splitLogLine = (line) => {
    const split = line.split(timestampPattern).filter(Boolean);
    return (
      <tr>
        <td>{split[0]}</td>
        <td>
          <Box dangerouslySetInnerHTML={{ __html: split[1] }} />
        </td>
      </tr>
    );
  };

  return (
    <Window width={750} height={600}>
      <Window.Content scrollable>
        <Section title={`Admin Help Ticket #${id}: ${name}`}>
          {!!responding?.length && (
            <Box>
              {responding.map((person, idx) => (
                <TypingIndicator key={idx} usr={person.key} />
              ))}
            </Box>
          )}
          State: {mapState(state)} <br />
          Opened at: {opened_at} (Approx {opened_age} ago) <br />
          {!!closed_at && (
            <span>
              Closed at: {closed_at} (Approx {closed_age} ago) <br />
            </span>
          )}
          <table>
            <tbody>{interactions.map((msg, idx) => splitLogLine(msg))}</tbody>
          </table>
        </Section>
        {!!related_tickets?.length && (
          <Section title="Other Tickets by User">
            {related_tickets.map((ticket, idx) => (
              <OtherTicketsEntry key={idx} {...ticket} />
            ))}
          </Section>
        )}
      </Window.Content>
    </Window>
  );
};

const OtherTicketsEntry = (props, context) => {
  const { id, status, name } = props;

  return (
    <span>
      {id} | {mapState(status)} | {name}
    </span>
  );
};

const TypingIndicator = (props, context) => {
  const { usr } = props;
  return <Button>{usr} is typing...</Button>;
};

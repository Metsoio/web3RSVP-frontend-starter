import Dashboard from "../../components/Dashboard";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import EventCard from "../../components/EventCard";

const MY_PAST_RSVPS = gql`
  query Account($id: String) {
    account(id: $id) {
      id
      rsvps {
        event {
          id
          name
          eventTimestamp
          imageURL
        }
      }
    }
  }
`;

export default function MyPastRSVPs() {
  const { data: account } = useAccount();

  const id = account ? account.address.toLowerCase() : "";
  const [currentTimestamp, setEventTimestamp] = useState(new Date().getTime());
  const { loading, error, data } = useQuery(MY_PAST_RSVPS, {
    variables: { id },
  });

  if (loading)
    return (
      <Dashboard page="rsvps" isUpcoming={false}>
        <p>Loading...</p>
      </Dashboard>
    );
  if (error)
    return (
      <Dashboard page="rsvps" isUpcoming={false}>
        <p>`Error! ${error.message}`</p>
      </Dashboard>
    );
  if (data) console.log(data);

  return (
    <Dashboard page="rsvps" isUpcoming={false}>
      {account ? (
        <div>
          {data && !data.account && <p>No has asistido a ningún evento</p>}
          {data && data.account && (
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {data.account.rsvps.map(function (rsvp) {
                if (rsvp.event.eventTimestamp < currentTimestamp) {
                  return (
                    <li key={rsvp.event.id}>
                      <EventCard
                        id={rsvp.event.id}
                        name={rsvp.event.name}
                        eventTimestamp={rsvp.event.eventTimestamp}
                        imageURL={rsvp.event.imageURL}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-8">
          <p className="mb-4">Por favor conecta tu wallet para ver tus inscripciones</p>
          <ConnectButton />
        </div>
      )}
    </Dashboard>
  );
}

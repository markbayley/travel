import * as React from "react";
import moment from "moment";

const dueTimes = [
  {
    distance: 6113,
    start: {
      time: moment().format("2020 7 1, 14, 38, 9"),
      address: "University College Dublin, Belfield, Dublin 4, Ireland",
      location: {
        lat: 53.30713120000001,
        lng: -6.220312,
      },
    },
    end: {
      time: moment().format("2020 7 1, 15, 2, 8"),
      address: "College Green, Dublin 2, Ireland",
      location: {
        lat: 53.3443633,
        lng: -6.2593112,
      },
    },
    steps: [
      {
        distance: 347,
        duration: 244,
        start: {
          lat: 53.30713120000001,
          lng: -6.220312,
        },
        stop: {
          lat: 53.309375,
          lng: -6.2187873,
        },
        mode: "WALKING",
      },
      {
        distance: 5445,
        duration: 968,
        start: {
          lat: 53.3094124,
          lng: -6.218878399999999,
        },
        stop: {
          lat: 53.3404818,
          lng: -6.2585706,
        },
        mode: "TRANSIT",
        transit: {
          dep: {
            name: "UCD N11 Entrance, stop 768",
            time: moment().format("2020 7 1, 14, 42, 13"),
          },
          arr: {
            name: "Dawson Street, stop 792",
            time: moment().format("2020 7 1, 14, 58, 21"),
          },
          headsign: "Ongar",
          type: "Dublin Bus",
          route: "39a",
        },
      },
      {
        distance: 321,
        duration: 226,
        start: {
          lat: 53.34212669999999,
          lng: -6.258003599999999,
        },
        stop: {
          lat: 53.3443633,
          lng: -6.2593112,
        },
        mode: "WALKING",
      },
    ],
  },

  {
    distance: 6444,
    start: {
      time: moment().format("2020 7 1, 14, 38, 9"),
      address: "University College Dublin, Belfield, Dublin 4, Ireland",
      location: {
        lat: 53.30713120000001,
        lng: -6.220312,
      },
    },
    end: {
      time: moment().format("2020 7 1, 15, 2, 8"),
      address: "College Green, Dublin 2, Ireland",
      location: {
        lat: 53.3443633,
        lng: -6.2593112,
      },
    },
    steps: [
      {
        distance: 347,
        duration: 244,
        start: {
          lat: 53.30713120000001,
          lng: -6.220312,
        },
        stop: {
          lat: 53.309375,
          lng: -6.2187873,
        },
        mode: "WALKING",
      },
      {
        distance: 5445,
        duration: 968,
        start: {
          lat: 53.3094124,
          lng: -6.218878399999999,
        },
        stop: {
          lat: 53.3404818,
          lng: -6.2585706,
        },
        mode: "TRANSIT",
        transit: {
          dep: {
            name: "UCD N11 Entrance, stop 768",
            time: moment().format("2020 7 1, 14, 42, 13"),
          },
          arr: {
            name: "Dawson Street, stop 792",
            time: moment().format("2020 7 1, 14, 58, 21"),
          },
          headsign: "Ongar",
          type: "Dublin Bus",
          route: "39a",
        },
      },
      {
        distance: 321,
        duration: 226,
        start: {
          lat: 53.34212669999999,
          lng: -6.258003599999999,
        },
        stop: {
          lat: 53.3443633,
          lng: -6.2593112,
        },
        mode: "WALKING",
      },
    ],
  },
];

console.log(dueTimes , 'dueTimes')

export default function Time() {
  return (
    <div className="App">
      <h1>Hello React Object Output</h1>
      {dueTimes.map((items, index) => {
        return (
          <div key={index}>
            <h4>Distance : {items.distance}</h4>
            <div>
              <h3>Start </h3>
              <p>Start Time: {items.start.time} </p>
              <p>Start address: {items.start.address} </p>
              <p>
                Start location: {items.start.location.lat} -{" "}
                {items.start.location.lng}{" "}
              </p>
            </div>
            <div>
              <h3>End </h3>
              <p>Start Time: {items.end.time} </p>
              <p>Start address: {items.end.address} </p>
              <p>
                Start location: {items.end.location.lat} -{" "}
                {items.end.location.lng}{" "}
              </p>
            </div>
            <div>
              <h3>steps </h3>
              <div>
                {items.steps.map((step, i) => {
                  return (
                    <div key={i}>
                      <p>Step mode: {step.mode}</p>
                      <p>Step Distance: {step.distance}</p>
                      <p>Step duration: {step.duration}</p>
                      {step.transit && (
                        <div>
                          <h5 style={{ background: "red", color: "white" }}>
                            Transit
                          </h5>
                          <p style={{ background: "yellow", color: "black" }}>
                            Route: {step.transit?.route}
                          </p>
                          <p style={{ background: "yellow", color: "black" }}>
                            Type: {step.transit?.type}
                          </p>
                          <p style={{ background: "yellow", color: "black" }}>
                            headsign: {step.transit?.headsign}
                          </p>
                          <p style={{ background: "yellow", color: "black" }}>
                            dep.name: {step.transit?.dep.name}
                          </p>
                          <p style={{ background: "yellow", color: "black" }}>
                            dep.time: {step.transit?.dep.time}
                          </p>
                          <p style={{ background: "yellow", color: "black" }}>
                            arr.name: {step.transit?.arr.name}
                          </p>
                          <p style={{ background: "yellow", color: "black" }}>
                            arr.time: {step.transit?.arr.time}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

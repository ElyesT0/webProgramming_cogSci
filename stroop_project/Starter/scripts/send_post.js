'use strict';

const saveParticipantData = (experiment_name_loc, initial_participantID, participantData_loc) => {
  let participantID_loc = debug ? `TEST-${initial_participantID}` : initial_participantID;

  console.log('sending data');
  console.log('sent object POST : ', {
    experiment_name: experiment_name_loc,
    participantID: participantID_loc,
    participantData: participantData_loc,
  });

  if (debug) {
    // Create a JSON blob and trigger download
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            experiment_name: experiment_name_loc,
            participantID: participantID_loc,
            participantData: participantData_loc,
          },
          null,
          2
        )
      );

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `participant_${participantID_loc}.json`);
    document.body.appendChild(downloadAnchor); // Required for Firefox
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor); // Cleanup

    console.log('JSON file downloaded locally.');
  } else {
    axios
      .post(`https://www.myWebsite.fr:${port}/api/saveData`, {
        //replace port and website URL with your own.
        experiment_name: experiment_name_loc,
        participantID: participantID_loc,
        participantData: participantData_loc,
      })
      .then((response) => {
        console.log('Data successfully saved:', response.data);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  }
};

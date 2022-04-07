const ReportForm = () => {
    // Hooks go here

    // Helper functions go here
    function sendEmail() {
        event.preventDefault();

        console.log("Sending email");

        fetch('/api/reportViolation', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: ''
          }).then((res) => {
            console.log('Response received')
            if (res.status === 200 || res.status === 250) {
              console.log('Response succeeded!')
            }
        })
    }

    return (
        <>
            <form onSubmit={sendEmail}>
                <input type="submit" value="Send Email"></input>
            </form>
        </>
    );
}

export default ReportForm;
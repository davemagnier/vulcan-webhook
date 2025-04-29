exports.handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "No request body" })
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Invalid JSON" })
      };
    }

    const wallet = body.wallet?.toLowerCase();

    const bannedWallets = [
      "0x229bc9afe9d1743ba0a2f929ff2e4e0184866f11",
      "0x4c6672e4a69585dba86412a03b585c856b12183f"
    ];

    if (!wallet) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Missing wallet" })
      };
    }

    if (bannedWallets.includes(wallet)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false })
      };
    }

    return {
      status

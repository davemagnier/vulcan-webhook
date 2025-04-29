exports.handler = async (event) => {
  try {
    let bodyData = {};

    if (event.body) {
      try {
        bodyData = JSON.parse(event.body);
      } catch (error) {
        console.error("Failed to parse JSON body:", error);
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, error: "Invalid JSON body" })
        };
      }
    }

    const wallet = bodyData.wallet?.toLowerCase();

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
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error("Webhook failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Server error" })
    };
  }
};

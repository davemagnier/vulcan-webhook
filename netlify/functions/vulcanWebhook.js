exports.handler = async (event) => {
  try {
    let bodyData;

    if (event.isBase64Encoded) {
      const buff = Buffer.from(event.body, 'base64');
      bodyData = JSON.parse(buff.toString('utf-8'));
    } else {
      bodyData = event.body ? JSON.parse(event.body) : {};
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

  } catch (err) {
    console.error("Webhook failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Server error" })
    };
  }
};

(function () {
  const pods = {
    1: {
      podName: "LTRCCT-2009-POD01",
      orgId: "ddd72e87-d0ef-4286-9df6-f9176d359d5e",
      adminUser: "lab-admin@ltrcct-2009-pod01.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod01.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD01.wxcc.webexcampaign.us/nextgen"
    },
    2: {
      podName: "LTRCCT-2009-POD02",
      orgId: "ffadb926-3255-4782-950d-91d3c8b2a135",
      adminUser: "lab-admin@ltrcct-2009-pod02.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod02.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD02.wxcc.webexcampaign.us/nextgen"
    },
    3: {
      podName: "LTRCCT-2009-POD03",
      orgId: "9a49d854-1606-4441-8be4-760661e102dd",
      adminUser: "lab-admin@ltrcct-2009-pod03.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod03.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD03.wxcc.webexcampaign.us/nextgen"
    },
    4: {
      podName: "LTRCCT-2009-POD04",
      orgId: "e5e64a42-9971-43a0-96ff-025f34273e5c",
      adminUser: "lab-admin@ltrcct-2009-pod04.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod04.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD04.wxcc.webexcampaign.us/nextgen"
    },
    5: {
      podName: "LTRCCT-2009-POD05",
      orgId: "f16ec61d-af08-4060-b7db-b199208b9da3",
      adminUser: "admin@ltrcct-2009-pod05.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod05.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD05.wxcc.webexcampaign.us/nextgen"
    },
    6: {
      podName: "LTRCCT-2009-POD06",
      orgId: "3d0eaf0c-50b9-4666-8a8b-d1806d2c21dc",
      adminUser: "admin@ltrcct-2009-pod06.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod06.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD06.wxcc.webexcampaign.us/nextgen"
    },
    7: {
      podName: "LTRCCT-2009-POD07",
      orgId: "f9afa7a8-ed7a-4024-a967-17fed0060f41",
      adminUser: "admin@ltrcct-2009-pod07.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod07.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD07.wxcc.webexcampaign.us/nextgen"
    },
    8: {
      podName: "LTRCCT-2009-POD08",
      orgId: "d8689c37-f5f1-408d-9a32-3cbe56418689",
      adminUser: "admin@ltrcct-2009-pod08.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod08.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD08.wxcc.webexcampaign.us/nextgen"
    },
    9: {
      podName: "LTRCCT-2009-POD09",
      orgId: "e4f64171-26f2-4088-9b8b-3cb3f9ecf036",
      adminUser: "admin@ltrcct-2009-pod09.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod09.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD09.wxcc.webexcampaign.us/nextgen"
    },
    10: {
      podName: "LTRCCT-2009-POD10",
      orgId: "5a9d9635-9e3f-43fc-a7c9-1898095f8e43",
      adminUser: "admin@ltrcct-2009-pod10.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod10.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD10.wxcc.webexcampaign.us/nextgen"
    },
    11: {
      podName: "LTRCCT-2009-POD11",
      orgId: "6f70ad40-7cd5-44ee-a5c6-e99749fa9cd8",
      adminUser: "admin@ltrcct-2009-pod11.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod11.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD11.wxcc.webexcampaign.us/nextgen"
    },
    12: {
      podName: "LTRCCT-2009-POD12",
      orgId: "2357c188-96cb-4ec0-b4c0-9e0445bec5a9",
      adminUser: "admin@ltrcct-2009-pod12.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod12.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD12.wxcc.webexcampaign.us/nextgen"
    },
    13: {
      podName: "LTRCCT-2009-POD13",
      orgId: "18ce6b3d-6e9e-4875-a671-4f0483ef3984",
      adminUser: "admin@ltrcct-2009-pod13.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod13.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD13.wxcc.webexcampaign.us/nextgen"
    },
    14: {
      podName: "LTRCCT-2009-POD14",
      orgId: "7842cddf-6963-4da4-845c-55ffda17620d",
      adminUser: "admin@ltrcct-2009-pod14.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod14.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD14.wxcc.webexcampaign.us/nextgen"
    },
    15: {
      podName: "LTRCCT-2009-POD15",
      orgId: "d91c7374-339e-433f-9a54-e794776220b1",
      adminUser: "admin@ltrcct-2009-pod15.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod15.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD15.wxcc.webexcampaign.us/nextgen"
    },
    16: {
      podName: "LTRCCT-2009-POD16",
      orgId: "88945fad-3913-4b36-935e-c76dd6250851",
      adminUser: "admin@ltrcct-2009-pod16.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod16.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD16.wxcc.webexcampaign.us/nextgen"
    },
    17: {
      podName: "LTRCCT-2009-POD17",
      orgId: "da1e1bb6-9acb-4086-9cab-27d0091d76e7",
      adminUser: "admin@ltrcct-2009-pod17.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod17.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD17.wxcc.webexcampaign.us/nextgen"
    },
    18: {
      podName: "LTRCCT-2009-POD18",
      orgId: "1069ad7d-dd8b-4408-be60-e9c02f9577eb",
      adminUser: "admin@ltrcct-2009-pod18.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod18.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD18.wxcc.webexcampaign.us/nextgen"
    },
    19: {
      podName: "LTRCCT-2009-POD19",
      orgId: "d3a52db8-54de-4169-ae22-02b0acd5f3e3",
      adminUser: "admin@ltrcct-2009-pod19.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod19.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD19.wxcc.webexcampaign.us/nextgen"
    },
    20: {
      podName: "LTRCCT-2009-POD20",
      orgId: "6f6ce8b5-50a4-472e-b47f-8d0d72362e79",
      adminUser: "admin@ltrcct-2009-pod20.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod20.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD20.wxcc.webexcampaign.us/nextgen"
    },
    21: {
      podName: "LTRCCT-2009-POD21",
      orgId: "a7fca137-474d-433e-a3be-419f68771a3c",
      adminUser: "admin@ltrcct-2009-pod21.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod21.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD21.wxcc.webexcampaign.us/nextgen"
    },
    22: {
      podName: "LTRCCT-2009-POD22",
      orgId: "d05a219d-2091-40dc-b634-03271c4e8f70",
      adminUser: "admin@ltrcct-2009-pod22.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod22.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD22.wxcc.webexcampaign.us/nextgen"
    },
    23: {
      podName: "LTRCCT-2009-POD23",
      orgId: "7e2a8612-b315-4dc8-abee-9258e96e9c7c",
      adminUser: "admin@ltrcct-2009-pod23.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod23.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD23.wxcc.webexcampaign.us/nextgen"
    },
    24: {
      podName: "LTRCCT-2009-POD24",
      orgId: "dfe842c0-f142-4a57-82ee-669edde628bc",
      adminUser: "admin@ltrcct-2009-pod24.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod24.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD24.wxcc.webexcampaign.us/nextgen"
    },
    25: {
      podName: "LTRCCT-2009-POD25",
      orgId: "d53089e6-d0f5-4255-b9be-908fcd893405",
      adminUser: "admin@ltrcct-2009-pod25.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod25.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD25.wxcc.webexcampaign.us/nextgen"
    },
    26: {
      podName: "LTRCCT-2009-POD26",
      orgId: "a7210632-7cb9-4781-bdda-61f3e4a7956a",
      adminUser: "admin@ltrcct-2009-pod26.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod26.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD26.wxcc.webexcampaign.us/nextgen"
    },
    29: {
      podName: "LTRCCT-2009-POD29",
      orgId: "042252a2-b2ff-460e-95c5-a5bec2125983",
      adminUser: "admin@ltrcct-2009-pod29.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod29.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD29.wxcc.webexcampaign.us/nextgen"
    },
    30: {
      podName: "LTRCCT-2009-POD30",
      orgId: "1524d209-4cd9-44e1-af07-40665396db72",
      adminUser: "admin@ltrcct-2009-pod30.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod30.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD30.wxcc.webexcampaign.us/nextgen"
    },
    31: {
      podName: "LTRCCT-2009-POD31",
      orgId: "299211f7-989d-4e56-9a23-e14eedf1e06e",
      adminUser: "admin@ltrcct-2009-pod31.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod31.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD31.wxcc.webexcampaign.us/nextgen"
    },
    32: {
      podName: "LTRCCT-2009-POD32",
      orgId: "870fc1d7-319e-4f04-a1af-3c7b795c7fea",
      adminUser: "admin@ltrcct-2009-pod32.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod32.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD32.wxcc.webexcampaign.us/nextgen"
    },
    33: {
      podName: "LTRCCT-2009-POD33",
      orgId: "910530a0-229e-4d84-b74e-7ab374ee82b2",
      adminUser: "admin@ltrcct-2009-pod33.wbx.ai",
      agentUser: "user1@ltrcct-2009-pod33.wbx.ai",
      campaignManagerUrl: "https://LTRCCT2009POD33.wxcc.webexcampaign.us/nextgen"
    }
  };

  const controlHubUrl = "https://admin.webex.com";
  const agentDesktopUrl = "https://desktop.wxcc-us1.cisco.com";
  const encryptedPasswordUrl = "../assets/pod-passwords.enc.json";
  let cachedPasswords = null;
  let cachedPasscode = null;

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function setLink(id, url) {
    const element = document.getElementById(id);
    if (!element) return;
    element.href = url;
    element.textContent = url;
  }

  function setMessage(message, text, isError) {
    message.textContent = text;
    message.classList.toggle("pod-lookup__message--error", Boolean(isError));
  }

  function base64ToBytes(value) {
    return Uint8Array.from(atob(value), function (character) {
      return character.charCodeAt(0);
    });
  }

  async function derivePasswordKey(passcode, encrypted) {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(passcode),
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: base64ToBytes(encrypted.salt),
        iterations: encrypted.iterations,
        hash: encrypted.hash
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
  }

  async function decryptPasswords(passcode) {
    if (cachedPasswords && cachedPasscode === passcode) return cachedPasswords;
    if (!window.crypto || !window.crypto.subtle) {
      const localPath = `${location.pathname}${location.search}${location.hash}`;
      const localhostUrl = `http://localhost:${location.port || "8000"}${localPath}`;
      if (location.hostname === "0.0.0.0") {
        throw new Error(`Open this page at ${localhostUrl} to unlock the password.`);
      }
      throw new Error("Open the HTTPS lab site, or use localhost for local testing, to unlock the password.");
    }

    const response = await fetch(encryptedPasswordUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Encrypted POD password file could not be loaded.");
    }

    const encrypted = await response.json();
    const encryptedBytes = base64ToBytes(encrypted.ciphertext);
    const tagLength = 16;
    const ciphertext = encryptedBytes.slice(0, encryptedBytes.length - tagLength);
    const tag = encryptedBytes.slice(encryptedBytes.length - tagLength);
    const key = await derivePasswordKey(passcode, encrypted);
    const plaintext = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: base64ToBytes(encrypted.iv),
        tagLength: tagLength * 8
      },
      key,
      new Uint8Array([...ciphertext, ...tag])
    );

    cachedPasscode = passcode;
    cachedPasswords = JSON.parse(new TextDecoder().decode(plaintext));
    return cachedPasswords;
  }

  function renderPodInfo(pod) {
    setText("pod-name", pod.podName);
    setText("pod-org-id", pod.orgId);
    setText("pod-admin-user", pod.adminUser);
    setText("pod-agent-user", pod.agentUser);
    setText("pod-password", "Locked until lab passcode is entered.");
    setText("pod-mcp-api-key", "Locked until lab passcode is entered.");
    setLink("pod-control-hub", controlHubUrl);
    setLink("pod-agent-desktop", agentDesktopUrl);
  }

  async function showPodInfo(options) {
    const input = document.getElementById("pod-number");
    const passcodeInput = document.getElementById("pod-passcode");
    const message = document.getElementById("pod-lookup-message");
    const result = document.getElementById("pod-lookup-result");
    const button = document.getElementById("pod-lookup-button");
    if (!input || !message || !result) return;

    const podNumber = Number.parseInt(input.value, 10);
    const pod = pods[podNumber];
    const shouldUnlockPassword = options && options.unlockPassword;

    if (!pod) {
      result.hidden = true;
      setMessage(message, "Enter an available POD number.", true);
      return;
    }

    renderPodInfo(pod);
    result.hidden = false;

    if (!shouldUnlockPassword) {
      setMessage(message, "Enter the lab passcode and click Show POD Info to unlock the POD credentials.", false);
      return;
    }

    const passcode = passcodeInput ? passcodeInput.value.trim() : "";
    if (!passcode) {
      setMessage(message, "Enter the lab passcode to unlock the POD credentials.", true);
      return;
    }

    try {
      if (button) button.disabled = true;
      const podSecrets = await decryptPasswords(passcode);
      const podSecret = podSecrets[String(podNumber)];
      const password = typeof podSecret === "string" ? podSecret : podSecret && podSecret.password;
      const mcpApiKey = typeof podSecret === "object" && podSecret ? podSecret.mcpApiKey : undefined;
      setText("pod-password", password || "Password not found for this POD.");
      setText("pod-mcp-api-key", mcpApiKey || "MCP API key not found for this POD.");
      setMessage(message, "Use these values for your assigned POD.", false);
    } catch (error) {
      cachedPasswords = null;
      cachedPasscode = null;
      const knownError =
        error.message.startsWith("Open this page") ||
        error.message.startsWith("Open the HTTPS lab site") ||
        error.message.startsWith("Encrypted POD password file");
      setMessage(
        message,
        knownError ? error.message : "The lab passcode did not unlock the POD credentials.",
        true
      );
    } finally {
      if (button) button.disabled = false;
    }
  }

  function initPodLookup() {
    const input = document.getElementById("pod-number");
    const passcodeInput = document.getElementById("pod-passcode");
    const button = document.getElementById("pod-lookup-button");
    if (!input || !button) return;

    button.addEventListener("click", function () {
      showPodInfo({ unlockPassword: true });
    });

    [input, passcodeInput].forEach(function (element) {
      if (!element) return;
      element.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          showPodInfo({ unlockPassword: true });
        }
      });
    });

    input.addEventListener("input", function () {
      if (input.value.length > 0) showPodInfo({ unlockPassword: false });
    });

    if (passcodeInput) {
      passcodeInput.addEventListener("input", function () {
        setText("pod-password", "Locked until lab passcode is entered.");
        setText("pod-mcp-api-key", "Locked until lab passcode is entered.");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPodLookup);
  } else {
    initPodLookup();
  }
})();

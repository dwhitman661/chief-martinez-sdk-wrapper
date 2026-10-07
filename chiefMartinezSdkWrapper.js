import * as DIDClientSDK from '@d-id/client-sdk';
import { ChatMode } from '@d-id/client-sdk';

export async function createDirectPlaybackAgent(agentId, clientKey, videoElement) {
  if (!agentId || !clientKey) {
    throw new Error('D-ID DirectPlayback wrapper: agentId and clientKey are required.');
  }

  if (!(videoElement instanceof HTMLVideoElement)) {
    throw new Error('D-ID DirectPlayback wrapper: videoElement must be an HTMLVideoElement.');
  }

  const agentManager = await DIDClientSDK.createAgentManager(agentId, {
    auth: {
      type: 'key',
      clientKey: clientKey
    },
    mode: ChatMode.DirectPlayback,
    callbacks: {
      onSrcObjectReady(value) {
        videoElement.srcObject = value;

        videoElement.play().catch(() => {
          console.warn('D-ID DirectPlayback wrapper: video playback was blocked by the browser.');
        });
      }
    }
  });

  await agentManager.connect();
  return agentManager;
}

export async function speakText(agentManager, text) {
  if (!agentManager) {
    throw new Error('D-ID DirectPlayback wrapper: agentManager is required.');
  }

  const trimmed = (text || '').trim();

  if (!trimmed) {
    return;
  }

  await agentManager.speak({
    type: 'text',
    input: trimmed
  });
}
import * as DIDClientSDK from '@d-id/client-sdk';
import { ChatMode } from '@d-id/client-sdk';

export async function createDirectPlaybackAgent(agentId, clientKey, videoElement) {
  if (!agentId || !clientKey) {
    throw new Error('D-ID DirectPlayback wrapper: agentId and clientKey are required.');
  }

  if (!(videoElement instanceof HTMLVideoElement)) {
    throw new Error('D-ID DirectPlayback wrapper: videoElement must be an HTMLVideoElement.');
  }

  const agentManager = await DIDClientSDK.createAgentManager(agentId, {
    auth: {
      type: 'key',
      clientKey: clientKey
    },
    mode: ChatMode.DirectPlayback,
    callbacks: {
      onSrcObjectReady(value) {
        videoElement.srcObject = value;

        videoElement.play().catch(() => {
          console.warn('D-ID DirectPlayback wrapper: video playback was blocked by the browser.');
        });
      }
    }
  });

  await agentManager.connect();
  return agentManager;
}

export async function speakText(agentManager, text) {
  if (!agentManager) {
    throw new Error('D-ID DirectPlayback wrapper: agentManager is required.');
  }

  const trimmed = (text || '').trim();

  if (!trimmed) {
    return;
  }

  await agentManager.speak({
    type: 'text',
    input: trimmed
  });
}

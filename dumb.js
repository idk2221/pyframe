// ==UserScript==
// @name         Nebula Complete System
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Complete Nebula interface with welcome, login, and panel
// @author       You
// @match        https://bloxflip.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.5; }
        }

        @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes glow {
            0% { text-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6; }
            50% { text-shadow: 0 0 20px #3b82f6, 0 0 30px #3b82f6, 0 0 40px #3b82f6; }
            100% { text-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6; }
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        @keyframes scaleIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }

        @keyframes buttonClick {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
            50% { transform: scale(0.95); box-shadow: 0 0 15px rgba(59, 130, 246, 0.8); }
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
        }

        .nebula-container {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999999999999;
            font-family: 'Poppins', sans-serif;
        }

        .nebula-modal {
            background: rgba(17, 24, 39, 0.95);
            border-radius: 1rem;
            border: 1px solid rgba(59, 130, 246, 0.3);
            width: 320px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .welcome-modal {
            height: 440px;
        }

        .login-modal {
            height: 380px;
        }

        .nebula-welcome {
            opacity: 0;
            transition: opacity 1s;
        }

        .welcome-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1e1e2f 0%, #2d3748 100%);
        }

        .welcome-icon {
            width: 64px;
            height: 64px;
            margin-bottom: 1.5rem;
            animation: pulse 2s infinite;
            color: #3b82f6;
        }

        .welcome-title {
            font-size: 3rem;
            font-weight: 600;
            color: white;
            margin-bottom: 0.5rem;
            animation: glow 2s infinite;
            letter-spacing: 1px;
        }

        .welcome-subtitle {
            color: #9ca3af;
            font-size: 1.25rem;
            opacity: 0;
            animation: slideDown 0.5s forwards;
            animation-delay: 0.5s;
            font-weight: 300;
            letter-spacing: 0.5px;
        }

        .loading-dots {
            display: flex;
            gap: 0.5rem;
            margin-top: 2rem;
        }

        .dot {
            width: 8px;
            height: 8px;
            background: #3b82f6;
            border-radius: 50%;
            animation: pulse 1s infinite;
        }

        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        .nebula-login {
            opacity: 0;
            transition: opacity 0.5s;
        }

        .login-content {
            padding: 2rem;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .login-title {
            color: white;
            font-size: 2.25rem;
            font-weight: 600;
            text-align: center;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            letter-spacing: 0.5px;
        }

        .login-title svg {
            width: 32px;
            height: 32px;
            color: #3b82f6;
        }

        .input-group {
            margin-bottom: 1.5rem;
        }

        .input-label {
            color: #9ca3af;
            font-size: 1rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        }

        .input-label svg {
            width: 18px;
            height: 18px;
            color: #3b82f6;
        }

        .input-field {
            width: 100%;
            padding: 0.875rem 1rem;
            background: rgba(31, 41, 55, 0.5);
            border: 1px solid rgba(75, 85, 99, 0.5);
            border-radius: 0.75rem;
            color: white;
            outline: none;
            transition: all 0.3s;
            font-size: 1rem;
            letter-spacing: 0.5px;
        }

        .input-field:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }

        .auth-button {
            width: 100%;
            padding: 1rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 0.75rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-top: auto;
            font-size: 1.1rem;
            letter-spacing: 0.5px;
        }

        .auth-button svg {
            width: 20px;
            height: 20px;
        }

        .auth-button:hover:not(:disabled) {
            background: #2563eb;
            transform: scale(1.02);
        }

        .auth-button:active:not(:disabled) {
            transform: scale(0.98);
        }

        .auth-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .spinner {
            width: 24px;
            height: 24px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s linear infinite;
        }

        .status-message {
            text-align: center;
            margin-top: 1rem;
            font-size: 1rem;
            opacity: 0;
            transition: opacity 0.3s;
            font-weight: 500;
        }

        .bottom-panel {
            position: fixed;
            bottom: -200px;
            left: 50%;
            transform: translateX(-50%);
            width: 85%;
            max-width: 925px;
            height: 220px;
            background: rgba(17, 24, 39, 0.85);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 2.5rem;
            box-shadow: 0 -10px 40px rgba(59, 130, 246, 0.15),
                        0 10px 30px rgba(0, 0, 0, 0.2); /* Added drop shadow */
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            backdrop-filter: blur(12px);
            z-index: 99999999999998;
            font-family: 'Poppins', sans-serif;
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
            overflow: hidden;
            pointer-events: auto;
        }

        .bottom-panel::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, 
                rgba(59, 130, 246, 0.05) 0%,
                rgba(37, 99, 235, 0.05) 100%);
            border-radius: 2.5rem;  // Changed from 2.5rem 2.5rem 0 0
            pointer-events: none;
        }

        .bottom-panel::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(
                90deg,
                transparent 0%,
                rgba(59, 130, 246, 0.3) 50%,
                transparent 100%
            );
        }

        .panel-content {
            flex-grow: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 1rem;
            gap: 2rem;
            pointer-events: auto;
        }

        .game-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            padding: 0.5rem;
        }

        .game-button {
            width: 65px;
            height: 65px;
            border-radius: 1.25rem;
            background: rgba(59, 130, 246, 0.1);
            border: 2px solid rgba(59, 130, 246, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: visible;
            animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .game-button:nth-child(1) { animation-delay: 0.1s; }
        .game-button:nth-child(2) { animation-delay: 0.2s; }
        .game-button:nth-child(3) { animation-delay: 0.3s; }
        .game-button:nth-child(4) { animation-delay: 0.4s; }

        .game-button::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
                45deg,
                transparent,
                rgba(59, 130, 246, 0.1),
                transparent
            );
            background-size: 200% 100%;
            animation: shimmer 2s infinite linear;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .game-button:hover {
            transform: translateY(-5px);
            border-color: rgba(59, 130, 246, 0.5);
            background: rgba(59, 130, 246, 0.2);
            box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.2);
        }

        .game-button:hover::before {
            opacity: 1;
        }

        .game-button img {
            width: 28px;
            height: 28px;
            object-fit: contain;
            filter: brightness(0) invert(1);
            transition: all 0.3s ease;
            pointer-events: none;
        }

        .game-button:hover img {
            transform: scale(1.1);
        }

        .logo-container {
            flex-grow: 1;
            height: 100%;
            background: rgba(59, 130, 246, 0.08);
            border-radius: 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            overflow: hidden;
            animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
            animation-delay: 0.5s;
            border: 2px solid rgba(59, 130, 246, 0.15);
            padding: 0 20px;
        }

        .logo-wrapper {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .main-logo {
            opacity: 0.7;
            filter: blur(1px);
            transition: all 0.3s ease;
        }

        .crash-controls-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex: 1;
        }

        .crash-controls {
            background: rgba(59, 130, 246, 0.15);
            border-radius: 8px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .method-selector {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .method-selector label {
            color: #ffffff;
            font-size: 14px;
        }

        #method-select {
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 4px;
            color: #ffffff;
            padding: 5px;
            font-size: 14px;
        }

        .predict-button {
            background: rgba(59, 130, 246, 0.3);
            border: 1px solid rgba(59, 130, 246, 0.5);
            border-radius: 4px;
            color: #ffffff;
            padding: 5px 10px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .predict-button:hover {
            background: rgba(59, 130, 246, 0.5);
        }

        .settings-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            transition: transform 0.3s ease;
        }

        .settings-button:hover {
            transform: rotate(45deg);
        }

        .settings-button svg {
            width: 24px;
            height: 24px;
        }

        .show-panel {
            bottom: 25px;
            transform: translateX(-50%) translateY(0);
        }

        .panel-handle {
            width: 50px;
            height: 8px; // Increased height for easier clicking
            background: rgba(59, 130, 246, 0.3);
            border-radius: 4px;
            margin: 0.5rem auto;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            z-index: 10; // Ensure it's above other elements
        }

        .bottom-panel:hover .panel-handle {
            width: 60px;
            background: rgba(59, 130, 246, 0.5);
        }

        .game-button.button-click {
            animation: buttonClick 0.3s ease-out forwards;
        }

        .bottom-panel {
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bottom-panel.minimized {
            transform: translateX(-50%) translateY(calc(100% - 40px));
        }

        .panel-handle {
            width: 50px;
            height: 4px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 2px;
            margin: 0.5rem auto;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .panel-handle:hover {
            background: rgba(59, 130, 246, 0.5);
        }

        .panel-handle.minimized {
            transform: rotate(180deg);
        }

        .panel-content {
            transition: opacity 0.3s ease;
        }

        .bottom-panel.minimized .panel-content {
            opacity: 0;
            pointer-events: none;
        }

        .crash-controls {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        .method-selector {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .method-selector label {
            color: #ffffff;
            font-size: 14px;
        }

        #method-select {
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 4px;
            color: #ffffff;
            padding: 5px;
            font-size: 14px;
        }

        .predict-button {
            background: rgba(59, 130, 246, 0.3);
            border: 1px solid rgba(59, 130, 246, 0.5);
            border-radius: 4px;
            color: #ffffff;
            padding: 5px 10px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .predict-button:hover {
            background: rgba(59, 130, 246, 0.5);
        }
    `);

    function showBottomPanel() {
        const panel = document.createElement('div');
        panel.className = 'bottom-panel';
        panel.innerHTML = `
            <div class="panel-header">
                <div class="panel-handle"></div>
            </div>
            <div class="panel-content">
                <div class="game-buttons">
                    <button class="game-button" title="Crash" id="crash-button">
                        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/rocket.png" alt="rocket"/>
                    </button>
                    <button class="game-button" title="Mines">
                        <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/tank-mine.png" alt="tank-mine"/>
                    </button>
                    <button class="game-button" title="Roulette">
                        <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/roulette.png" alt="roulette"/>
                    </button>
                    <button class="game-button" title="Towers">
                        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/sand-castle.png" alt="sand-castle"/>
                    </button>
                </div>
                <div class="logo-container">
                    <div class="logo-wrapper">
                        <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/FFFFFF/galaxy.png" alt="galaxy" class="main-logo"/>
                    </div>
                    <div class="crash-controls-container">
                        <div class="crash-controls" style="display: none;">
                            <div class="method-selector">
                                <label for="method-select">Method:</label>
                                <select id="method-select">
                                    <option value="ai">AI</option>
                                    <option value="darian">Darian Method</option>
                                    <option value="knn">KNN</option>
                                    <option value="jp">JP AI</option>
                                    <option value="dev">Dev AI</option>
                                </select>
                            </div>
                            <button class="predict-button">Predict</button>
                        </div>
                    </div>
                    <button class="settings-button" title="Settings">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0,0,300,150" style="fill:#FFFFFF;">
                            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M9.66797,2l-0.49219,2.52344c-0.82076,0.31036 -1.57968,0.74397 -2.24609,1.29102l-2.42383,-0.83594l-2.33203,4.04297l1.93945,1.68555c-0.06877,0.42195 -0.11328,0.85159 -0.11328,1.29297c0,0.44138 0.04452,0.87101 0.11328,1.29297l-1.93945,1.68555l2.33203,4.04297l2.42383,-0.83594c0.66642,0.54705 1.42533,0.98065 2.24609,1.29102l0.49219,2.52344h4.66406l0.49219,-2.52344c0.82076,-0.31036 1.57968,-0.74397 2.24609,-1.29102l2.42383,0.83594l2.33203,-4.04297l-1.93945,-1.68555c0.06877,-0.42195 0.11328,-0.85159 0.11328,-1.29297c0,-0.44138 -0.04452,-0.87101 -0.11328,-1.29297l1.93945,-1.68555l-2.33203,-4.04297l-2.42383,0.83594c-0.66642,-0.54705 -1.42533,-0.98065 -2.24609,-1.29102l-0.49219,-2.52344zM12,8c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4z"></path></g></g>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(panel);

        setTimeout(() => {
            panel.classList.add('show-panel');
        }, 100);

        // Add click event listeners to game buttons
        panel.querySelectorAll('.game-button').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!this.classList.contains('button-click')) {
                    this.classList.add('button-click');
                    setTimeout(() => {
                        this.classList.remove('button-click');
                    }, 300);
                }

                // Show crash controls when Crash button is clicked
                if (this.id === 'crash-button') {
                    const crashControls = panel.querySelector('.crash-controls');
                    crashControls.style.display = crashControls.style.display === 'none' ? 'flex' : 'none';
                }
            });
        });

        // Add minimize/maximize functionality
        const panelHandle = panel.querySelector('.panel-handle');
        let isMinimized = false;

        function toggleMinimize(e) {
            console.log('Toggle minimize called'); // Debug log
            e.preventDefault();
            e.stopPropagation();
            isMinimized = !isMinimized;
            panel.classList.toggle('minimized', isMinimized);
            panelHandle.classList.toggle('minimized', isMinimized);
            console.log('Panel minimized:', isMinimized); // Debug log
        }

        panelHandle.addEventListener('click', toggleMinimize);
        panelHandle.addEventListener('touchstart', toggleMinimize); // Add touch support

        // Make sure panel and handle are clickable
        panel.style.pointerEvents = 'auto';
        panelHandle.style.pointerEvents = 'auto';

        // Debug: Log when mouse enters and leaves the panel handle
        panelHandle.addEventListener('mouseenter', () => console.log('Mouse entered panel handle'));
        panelHandle.addEventListener('mouseleave', () => console.log('Mouse left panel handle'));
    }

    const welcomeScreen = document.createElement('div');
    welcomeScreen.className = 'nebula-container nebula-welcome';
    welcomeScreen.innerHTML = `
        <div class="nebula-modal welcome-modal">
            <div class="welcome-content">
                <svg class="welcome-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="welcome-title">Nebula</div>
                <div class="welcome-subtitle">Welcome Back</div>
                <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>
    `;

    const loginUI = document.createElement('div');
    loginUI.className = 'nebula-container nebula-login';
    loginUI.innerHTML = `
        <div class="nebula-modal login-modal">
            <div class="login-content">
                <div class="login-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Nebula Login
                </div>
                <div class="input-group">
                    <label class="input-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Discord ID
                    </label>
                    <input type="text" id="discord-id" class="input-field" placeholder="Enter your Discord ID">
                </div>
                <button id="auth-button" class="auth-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    Authenticate
                </button>
                <div id="status-message" class="status-message"></div>
            </div>
        </div>
    `;

    document.body.appendChild(welcomeScreen);
    document.body.appendChild(loginUI);

    setTimeout(() => {
        welcomeScreen.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.remove();
            loginUI.style.opacity = '1';
        }, 1000);
    }, 2000);

    setTimeout(() => {
        const authButton = document.getElementById('auth-button');
        const discordInput = document.getElementById('discord-id');
        const statusMessage = document.getElementById('status-message');

        authButton.addEventListener('click', () => {
            const discordId = discordInput.value;
            if (discordId.trim()) {
                discordInput.disabled = true;
                authButton.disabled = true;
                authButton.innerHTML = `
                    <div class="spinner"></div>
                    <span>Authenticating...</span>
                `;

                statusMessage.textContent = 'Verifying your Discord ID...';
                statusMessage.style.opacity = '1';
                statusMessage.style.color = '#3b82f6';

                setTimeout(() => {
                    authButton.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                        <span>Success!</span>
                    `;
                    authButton.style.backgroundColor = '#10b981';

                    statusMessage.textContent = 'Authentication successful! Loading...';
                    statusMessage.style.color = '#10b981';

                    // Show bottom panel and hide login
                    showBottomPanel();
                    setTimeout(() => {
                        const loginModal = document.querySelector('.nebula-modal');
                        loginModal.style.transform = 'translateY(-20px)';
                        loginModal.style.opacity = '0';

                        setTimeout(() => {
                            loginModal.parentElement.remove();
                        }, 500);
                    }, 1000);
                }, 2000);
            } else {
                statusMessage.textContent = 'Please enter your Discord ID';
                statusMessage.style.opacity = '1';
                statusMessage.style.color = '#ef4444';

                setTimeout(() => {
                    statusMessage.style.opacity = '0';
                }, 2000);
            }
        });

        discordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                authButton.click();
            }
        });
    }, 2000);
})();
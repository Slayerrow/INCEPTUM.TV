// Example: Change background color on button click
function changeBackgroundColor() {
    document.body.style.backgroundColor = "#f0f0f0";
}

// Example: Display an alert when a section is clicked
document.getElementById("home").addEventListener("click", function() {
    alert("Welcome to INCEPTUM.tv!");
});
// Function to toggle dark/light mode
document.getElementById("toggleMode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Style for dark mode (Add this to your CSS file)
document.head.insertAdjacentHTML('beforeend', `
    <style>
        body.dark-mode {
            background-color: #333;
            color: white;
        }
        body.dark-mode header, body.dark-mode footer {
            background-color: #444;
        }
        body.dark-mode a {
            color: #ccc;
        }
    </style>
`);
// Add an event listener to the "home" section
document.getElementById("home").addEventListener("click", function() {
    alert("Welcome to INCEPTUM.tv!");
});
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
// Replace with your API key
const apiKey = 'YOUR_API_KEY';
const channelId = 'YOUR_CHANNEL_ID';  // Replace with your YouTube Channel ID

function getYouTubeVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=5`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const videoContainer = document.getElementById('video-container');
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                const videoDescription = item.snippet.description;
                const videoThumbnail = item.snippet.thumbnails.high.url;

                // Create HTML for each video
                const videoElement = `
                    <div class="video-item">
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <img src="${videoThumbnail}" alt="${videoTitle}">
                            <h3>${videoTitle}</h3>
                            <p>${videoDescription}</p>
                        </a>
                    </div>
                `;
                videoContainer.innerHTML += videoElement;
            });
        })
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

window.onload = getYouTubeVideos;

// Example: Embed your videos manually (no API needed here)
document.getElementById("video-container").innerHTML += `
    <div class="video-item">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="video-item">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID2" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="video-item">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID3" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
`;

document.getElementById('toggleMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
document.getElementById('searchButton').addEventListener('click', function() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    // Get all the sections or items you want to search through
    const items = document.querySelectorAll('.explore-card, .show-card');

    items.forEach(item => {
        const title = item.querySelector('h3').innerText.toLowerCase();

        // If the search term matches the title, show the item, otherwise hide it
        if (title.includes(searchQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});
document.getElementById('searchInput').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    
    const items = document.querySelectorAll('.explore-card, .show-card');
    
    items.forEach(item => {
        const title = item.querySelector('h3').innerText.toLowerCase();
        if (title.includes(searchQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});
// Open the full post modal
function openPost() {
    document.getElementById("full-post").style.display = "block";
}

// Close the full post modal
function closePost() {
    document.getElementById("full-post").style.display = "none";
}

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
    if (event.target === document.getElementById("full-post")) {
        closePost();
    }
};
// AWS SDK for JavaScript
const AWS = require('aws-sdk');

// Initialize Personalize Runtime client
const personalize = new AWS.PersonalizeRuntime({
    region: 'us-west-2', // Change to your region
});

// Function to get recommendations
async function getRecommendations(userId) {
    const params = {
        campaignArn: 'your_campaign_arn', // Replace with your Amazon Personalize campaign ARN
        userId: userId,
        numResults: 5, // Number of recommendations
    };

    try {
        const data = await personalize.getRecommendations(params).promise();
        console.log('Recommendations:', data);
        return data;
    } catch (error) {
        console.error('Error getting recommendations:', error);
    }
}

// Example usage: Get recommendations for a user
getRecommendations('user123');

// Example using Fetch API to interact with Descript API
async function transcribeVideo(audioFileUrl) {
    const response = await fetch('https://api.descript.com/v1/transcriptions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer your_descript_api_key', // Replace with your Descript API Key
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            audio_url: audioFileUrl,
            language: 'en', // Set language code for transcription
        }),
    });

    const data = await response.json();
    console.log('Transcription:', data);
    return data.transcription_text;
}

// Example usage: Transcribe a video
transcribeVideo('https://example.com/path-to-your-video.mp4');

const axios = require('axios');

async function generateCopy(prompt) {
    const response = await axios.post('https://api.copy.ai/v1/generate', {
        prompt: prompt,
        model: 'gpt-3.5-turbo', // Choose the model you need
        temperature: 0.7, // Controls the randomness
    }, {
        headers: {
            'Authorization': 'Bearer your_copy_ai_api_key',
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}

generateCopy("Write a captivating summary of a documentary about the culture of Uttar Pradesh.")
    .then((data) => console.log(data));
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const client = new ImageAnnotatorClient();

async function annotateImage(imagePath) {
    const [result] = await client.labelDetection(imagePath);
    const labels = result.labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
}

// Example usage: Detect tags from an image
annotateImage('path_to_image.jpg');

const { TranslationServiceClient } = require('@google-cloud/translate');
const client = new TranslationServiceClient();

async function translateText(text, targetLanguage) {
    const [translation] = await client.translateText({
        parent: client.locationPath('your_project_id', 'global'),
        contents: [text],
        mimeType: 'text/plain', // or 'text/html'
        targetLanguageCode: targetLanguage,
    });

    console.log('Translated text:');
    console.log(translation.translations[0].translatedText);
}

// Example usage: Translate a documentary description to Spanish
translateText('Explore the history of Uttar Pradesh.', 'es');
const axios = require('axios');

async function transcribeAndSummarize(videoUrl) {
    const transcriptionResponse = await axios.post('https://api.deepgram.com/v1/listen', {
        audio_url: videoUrl,
        access_token: 'your_deepgram_api_key',
    });

    const transcript = transcriptionResponse.data.results;
    console.log('Transcription:', transcript);

    // Here you can add a summarizer logic to reduce the transcript length
    const summary = transcript.slice(0, 200); // Example: get first 200 characters of transcript
    console.log('Summary:', summary);
}

transcribeAndSummarize('https://example.com/your-video.mp4');
const axios = require('axios');

async function postToSocialMedia(message) {
    const response = await axios.post('https://api.bufferapp.com/1/updates/create.json', {
        access_token: 'your_buffer_access_token',
        text: message,
        profile_ids: ['your_profile_id'], // Specify your social media profile
    });

    console.log('Post Response:', response.data);
}

// Example usage: Post a new documentary update
postToSocialMedia('Check out our latest documentary on the culture of Uttar Pradesh!');

// Add Mixpanel tracking to your site
mixpanel.track("Documentary Viewed", {
    "documentary_name": "Culture of Uttar Pradesh",
    "user_id": "user123",
});

// Later use this data for personalization or insights
{
    "articles": [
        { "title": "Documentary 1", "summary": "A brief summary...", "link": "doc1.html" },
        { "title": "Documentary 2", "summary": "Another summary...", "link": "doc2.html" }
    ]
}
 let isRecording = false;
        let isMom = true;
        
        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
        }
        
        function toggleParent() {
            const textElement = document.getElementById('parent-text');
            const iconElement = document.getElementById('parent-icon');
            
            if (isMom) {
                textElement.textContent = 'DAD';
                // Dad icon (slightly different styling)
                iconElement.innerHTML = '<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>';
            } else {
                textElement.textContent = 'MOM';
                // Mom icon
                iconElement.innerHTML = '<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>';
            }
            
            isMom = !isMom;
        }
        
        function toggleRecording() {
            const recordButton = document.querySelector('.record-button');
            
            if (!isRecording) {
                recordButton.classList.add('recording');
                isRecording = true;
            } else {
                recordButton.classList.remove('recording');
                isRecording = false;
            }
        }
        
        // Initialize with light theme
        document.body.setAttribute('data-theme', 'light');
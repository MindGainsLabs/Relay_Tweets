document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const channelId = document.getElementById('channelId').value.trim();
    const hours = document.getElementById('hours').value.trim();

    const resultDiv = document.getElementById('result');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');

    resultDiv.innerHTML = 'Processing...';
    progressContainer.style.display = 'block';
    progressBar.value = 0;

    try {
        const response = await fetch('/api/retrieve-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Adicione o cabeçalho de autorização se necessário
                // 'Authorization': 'Bearer seu_token_aqui'
            },
            body: JSON.stringify({ channelId, hours })
        });

        const data = await response.json();

        if (response.ok) {
            // Atualizar a barra de progresso
            progressBar.value = 50;

            // Converter os dados recebidos em uma Blob
            const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Criar um elemento de link para download
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `messages_${Date.now()}.txt`;
            downloadLink.textContent = 'Download messages for the period(.txt)';

            resultDiv.innerHTML = `
                <p>Messages collected successfully!</p>
                <a href="/api/download-messages" download="messages_full.txt">Download All Messages(.txt)</a>
            `;
            resultDiv.appendChild(downloadLink);

            // Atualizar a barra de progresso
            progressBar.value = 100;

        } else {
            resultDiv.innerHTML = `<p class="error">Erro: ${data.error}</p>`;
            progressContainer.style.display = 'none';
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">Error to connect to server.</p>`;
        console.error('Error:', error);
        progressContainer.style.display = 'none';
    }
});

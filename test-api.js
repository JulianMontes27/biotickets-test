// Test simple para verificar que la API funciona
async function testAPI() {
    try {
        console.log('🔄 Probando conexión a WordPress API...');
        
        const response = await fetch('https://www.biotickets.com/wp-json/wp/v2/tribe_events', {
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        console.log('✅ API Response Status:', response.status);
        console.log('✅ Number of events:', data.length);
        
        if (data.length > 0) {
            console.log('🎉 First event title:', data[0].title.rendered);
            console.log('🎉 First event date (WordPress):', data[0].date);
            console.log('🎉 First event date parsed:', new Date(data[0].date));
            console.log('🎉 Today:', new Date());
            console.log('🎉 Is future event?:', new Date(data[0].date) > new Date());
            console.log('🎉 First event meta keys:', Object.keys(data[0].meta || {}));
        }
        
        if (data.length > 1) {
            console.log('🎉 Second event title:', data[1].title.rendered);
            console.log('🎉 Second event date:', data[1].date);
            console.log('🎉 Second event parsed:', new Date(data[1].date));
            console.log('🎉 Is future event?:', new Date(data[1].date) > new Date());
        }
        
        return data;
        
    } catch (error) {
        console.error('❌ Error testing API:', error);
        return null;
    }
}

// Ejecutar test
testAPI();
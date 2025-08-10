// Test del adaptador de eventos
import { eventsAdapter } from './src/services/events-adapter.js';

async function testAdapter() {
    try {
        console.log('🔄 Probando adaptador de eventos...');
        
        const upcomingEvents = await eventsAdapter.getUpcomingEvents(5);
        
        console.log('✅ Eventos próximos encontrados:', upcomingEvents.length);
        
        if (upcomingEvents.length > 0) {
            const firstEvent = upcomingEvents[0];
            console.log('🎉 Primer evento adaptado:');
            console.log('  - ID:', firstEvent.id);
            console.log('  - Título:', firstEvent.title);
            console.log('  - Descripción:', firstEvent.description.substring(0, 100) + '...');
            console.log('  - Fecha:', firstEvent.date);
            console.log('  - Hora:', firstEvent.time);
            console.log('  - Venue:', firstEvent.venue);
            console.log('  - Precio:', firstEvent.ticketPrice);
            console.log('  - Categoría:', firstEvent.category);
            console.log('  - Estado:', firstEvent.status);
            console.log('  - Tags:', firstEvent.tags);
        }
        
        return upcomingEvents;
        
    } catch (error) {
        console.error('❌ Error testing adapter:', error);
        return null;
    }
}

testAdapter();
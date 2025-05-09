/**
 * Logger class for centralized logging within the application.
 *
 * This abstraction allows for logging various types of messages (info, warnings, errors).
 * The methods are designed to be easily extensible to integrate with external logging and monitoring services.
 */
class Logger {
    // Logs a general message
    static logInfo(message: string, data?: any) {
        console.log(`[INFO] ${message}`, data ? data : '')
    }

    // Logs a warning message
    static logWarning(message: string, warningDetails?: any) {
        console.warn(`[WARNING] ${message}`, warningDetails ? warningDetails : '')
    }

    // Logs an error message
    static logError(message: string, error: any) {
        console.error(`[ERROR] ${message}:`, error)
    }    
}

export default Logger
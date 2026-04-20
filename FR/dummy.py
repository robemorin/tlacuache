import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FFMpegWriter

# --- Configuración Inicial ---
x0 = np.array([-np.pi, np.e])  # Posición inicial
xd = np.array([5.0, 5.0])      # Setpoint (Punto de repulsión)
Kp = -0.5                      # Ganancia negativa para NO convergencia
dt = 0.01                      # Paso de tiempo
t_final = 10.0
steps = int(t_final / dt)
dead_zone_radius = 0.5         # Zona muerta solicitada

# --- Modelo del Sistema ---
def system_dynamics(x, xd, K):
    # Ecuación diferencial: x_dot = -K * (x - xd)
    # Al ser K negativo, la partícula se aleja de xd
    return -K * (x - xd)

# --- Implementación Manual de RK4 ---
def rk4_step(f, x, xd, K, dt):
    k1 = f(x, xd, K)
    k2 = f(x + dt/2 * k1, xd, K)
    k3 = f(x + dt/2 * k2, xd, K)
    k4 = f(x + dt * k3, xd, K)
    return x + (dt/6.0) * (k1 + 2*k2 + 2*k3 + k4)

# --- Simulación ---
history = np.zeros((steps, 2))
errors = np.zeros(steps)
current_x = x0.copy()

for i in range(steps):
    history[i] = current_x
    # Error: ||x(t) - xd||
    dist = np.linalg.norm(current_x - xd)
    errors[i] = 1.0 / dist if dist != 0 else 100 # Evitar división por cero
    
    # Integración numérica
    current_x = rk4_step(system_dynamics, current_x, xd, Kp, dt)

# --- Visualización y Animación ---
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Configuración Gráfica 1: Trayectoria
ax1.set_title("Trayectoria: Repulsión del Setpoint")
ax1.set_xlabel("X")
ax1.set_ylabel("Y")
ax1.grid(True)
ax1.plot(x0[0], x0[1], 'go', label='Inicio (-π, e)')
ax1.plot(xd[0], xd[1], 'rx', markersize=10, label='Setpoint (Repulsor)')
# Dibujar zona muerta
circle = plt.Circle((xd[0], xd[1]), dead_zone_radius, color='r', fill=False, linestyle='--')
ax1.add_patch(circle)

line, = ax1.plot([], [], 'b-', alpha=0.6)
point, = ax1.plot([], [], 'bo')

# Configuración Gráfica 2: Error Inverso
ax2.set_title("Inverso del Error: $1/||x(t) - x_d||$")
ax2.set_xlabel("Tiempo (s)")
ax2.set_ylabel("Valor")
ax2.grid(True)
error_line, = ax2.plot([], [], 'm-')

# Función de animación
def update(frame):
    if frame % 10 == 0: # Optimizar frames
        line.set_data(history[:frame, 0], history[:frame, 1])
        point.set_data([history[frame, 0]], [history[frame, 1]])
        
        t = np.linspace(0, frame*dt, frame)
        error_line.set_data(t, errors[:frame])
        
        ax2.set_xlim(0, t_final)
        ax2.set_ylim(0, max(errors)*1.1)
    return line, point, error_line

# Ajustar límites de ejes automáticamente
ax1.set_xlim(min(history[:,0])-1, max(history[:,0])+1)
ax1.set_ylim(min(history[:,1])-1, max(history[:,1])+1)

# Mostrar resultados finales (Para entorno sin video inmediato)
plt.tight_layout()
plt.show()
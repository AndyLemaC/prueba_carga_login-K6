# ⚡ Prueba de Carga con K6 - Servicio de Login

Este proyecto realiza una prueba de carga sobre el endpoint de login utilizando [K6](https://k6.io/), simulando múltiples usuarios concurrentes, validando el rendimiento bajo estrés, y evaluando tiempos de respuesta frente a umbrales definidos.

---

## ✅ Requisitos Previos

- Tener [K6 instalado](https://k6.io/docs/getting-started/installation/)
- Git instalado
- Editor de texto (Visual Studio Code, por ejemplo)

---
## ⚙️ Configuración del Entorno

### 1️⃣ Instalar Chocolatey y K6
    
#### Paso 1: Instalar Chocolatey (si no lo tienes)
1. Abre CMD como Administrador.
2. Ejecuta este comando:

```bash
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = 'Tls12'; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

```
#### Paso 2: Instalar K6 con Chocolatey
Una vez que tengas Chocolatey instalado, ejecuta en la misma ventana de CMD:

```bash
choco install k6 -y

```

#### Paso 3: Verificar instalación
Después de la instalación, puedes verificar que K6 esté funcionando correctamente con:

```bash
k6 version
```
Esto debería mostrarte algo como:

```bash
k6 v0.49.0 (o la versión más reciente)
```

### 🔁 Alternativa sin Chocolatey

Si no quieres usar Chocolatey, puedes descargar el ejecutable desde:

👉 https://github.com/grafana/k6/releases

Descargas el .zip, lo extraes y agregas la carpeta al PATH del sistema.

### 2️⃣ Clonar el Repositorio

```bash
git clone https://github.com/AndyLemaC/prueba_carga_k6.git
cd prueba_carga_k6
```

---
## 📁 Estructura del Proyecto

```
prueba_k6/
├── data/
│   └── users.csv                # Datos de prueba con usuarios y contraseñas
├── resultados/
│   ├── resultado_prueba_k6.png  # Reporte generado                
├── scripts/
│   └── login-test.js            # Script de prueba principal
├── conclusiones.txt             # Hallazgos del test
└── README.md                    # Este archivo
```

---

## ▶️ Ejecución del Script

Desde la terminal (CMD o PowerShell), navega a la carpeta del proyecto:

```bash
# Ir a la carpeta donde esta el proyecto
cd C:\prueba_k6\prueba_k6

# Ejecutar pruebas de carga
k6 run prueba_k6\scripts\login-test.js
```

---

## 🔧 Configuración de la Prueba

- 🔁 **Escenario**: 1 escenario por defecto
- 👥 **Usuarios virtuales (VUs)**: hasta 20
- ⏱ **Duración total**: 3m30s (3 etapas incluyendo parada gradual)
- 📄 **Datos**: usuarios desde archivo CSV (`data/users.csv`)

---

## 🎯 Umbrales Definidos

| Métrica               | Umbral                  | Resultado alcanzado |
|-----------------------|--------------------------|----------------------|
| Tiempo respuesta p(95) | < 1500 ms               | ✅ 403.14 ms         |
| Tasa de error         | < 3%                    | ✅ 0.00%             |

---

## 📊 Resultados Obtenidos

### ✅ Totales

- Total de checks: **4862**
- Checks correctos: **100.00%**
- Fallos: **0%**

### 💡 Indicadores HTTP

| Métrica                  | Valor                   |
|--------------------------|-------------------------|
| Promedio (`avg`)         | 366.34 ms               |
| Mínimo (`min`)           | 319.07 ms               |
| Mediana (`med`)          | 361.9 ms                |
| Máximo (`max`)           | 1.15 s                  |
| Percentil 90 (`p(90)`)   | 389.60 ms               |
| Percentil 95 (`p(95)`)   | **403.14 ms**           |

### 🔁 Iteraciones

- Iteraciones completadas: **2431**
- Iteraciones por segundo: **11.53**

### 🌐 Red

- Datos recibidos: **1.4 MB**
- Datos enviados: **285 KB**

---

## 📌 Conclusiones

Consulta el archivo `conclusiones.txt` para ver los hallazgos clave del test, comportamiento bajo carga, posibles mejoras o puntos de atención detectados.

## ❓ Resolución de Problemas

- Verifica que tengas K6 correctamente instalado (`k6 version`)
- Asegúrate de estar en la carpeta del proyecto antes de ejecutar el script
- Asegúrate de que el archivo `usuarios.csv` tenga el formato esperado
